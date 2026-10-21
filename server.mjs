import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

// Checkpoints stay in browser storage. Only fixed public assets cross this boundary.
const assets=new Map([['/','index.html'],['/app.js','app.js'],['/core.js','core.js'],['/style.css','style.css']]);
const types={html:'text/html; charset=utf-8',js:'text/javascript; charset=utf-8',css:'text/css; charset=utf-8'};
export async function handle(req,res){
 let path;
 try{
  if(typeof req.url!=='string'||!req.url.startsWith('/')||req.url.startsWith('//'))throw Error('Invalid request target');
  path=new URL(req.url,'http://localhost').pathname;
 }catch{res.writeHead(400);res.end('Bad request');return;}
 const file=assets.get(path);
 if(!file||!['GET','HEAD'].includes(req.method)){res.writeHead(404);res.end('Not found');return;}
 try{
  const data=await readFile(new URL('./public/'+file,import.meta.url));
  res.writeHead(200,{'Content-Type':types[file.split('.').pop()],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",'Referrer-Policy':'no-referrer'});
  res.end(req.method==='HEAD'?undefined:data);
 }catch{res.writeHead(500);res.end('Build file unavailable');}
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const port=Number(process.env.PORT||4173);
 http.createServer(handle).listen(port,'127.0.0.1',()=>console.log(`ReturnPoint: http://127.0.0.1:${port}`));
}
