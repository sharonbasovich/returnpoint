import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['public','server.mjs','package.json','README.md','WALKTHROUGH.md','LICENSE','evidence','tests','build.mjs'])await cp(file,'dist/'+file,{recursive:true});
await writeFile('dist/BUILD.json',JSON.stringify({name:'ReturnPoint',version:JSON.parse(await readFile('package.json')).version,builtAt:new Date().toISOString(),runtimeDependencies:0},null,2));
console.log('Built dist/: self-contained source and server; run node server.mjs from dist.');
