import {test} from 'node:test';
import assert from 'node:assert/strict';
import {handle} from '../server.mjs';
async function request(url,method='GET'){
 const result={status:null,headers:{},body:null};
 await handle({url,method},{writeHead(status,headers={}){result.status=status;result.headers=headers;},end(body){result.body=body?.toString();}});
 return result;
}
test('server exposes only four fixed assets; notes never have a data endpoint',async()=>{
 for(const path of ['/','/app.js','/core.js','/style.css'])assert.equal((await request(path)).status,200);
 for(const path of ['/checkpoint','/returnpoint.checkpoint.v1','/README.md','/evidence/desktop.jpg','/package.json','/.git/config','/public/index.html','/constructor','/__proto__','/../../README.md','/%2e%2e/README.md','/..%2fREADME.md','/C:/Users/Sharon/Documents/private.txt'])assert.equal((await request(path)).status,404,path);
});
test('request methods, malformed targets, HEAD and CSP fail closed',async()=>{
 for(const target of [undefined,'http://[','http://example.com/','//example.com/'])assert.equal((await request(target)).status,400);
 assert.equal((await request('/','POST')).status,404);
 const head=await request('/','HEAD');assert.equal(head.status,200);assert.equal(head.body,undefined);
 const page=await request('/?checkpoint=private-note');assert.equal(page.status,200);assert.ok(!page.body.includes('private-note'));assert.match(page.headers['Content-Security-Policy'],/connect-src 'none'/);assert.equal(page.headers['X-Content-Type-Options'],'nosniff');
});
