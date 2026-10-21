export const KEY='returnpoint.checkpoint.v1';
export const fields=['project','facts','next','assumptions','questions','references'];
export const MAX_IMPORT_BYTES=512000;
function checkImportSize(raw){if(typeof raw!=='string'||new TextEncoder().encode(raw).length>MAX_IMPORT_BYTES)throw Error('Import exceeds 512,000 UTF-8 bytes.');}
export const blank=()=>Object.fromEntries(fields.map(k=>[k,'']));
export const demo={project:'Campus energy study',facts:'CSV parser handles missing dates.\nVerified locally against the 12-row synthetic fixture on Oct 21.',next:'Run the parser on the three missing-meter rows.',assumptions:'Missing meter values can be treated as zero.',questions:'Does an empty meter reading mean no usage, or missing data?',references:'Synthetic fixture: fixtures/energy-sample.csv (example path)\nParser notes: notebook section 3 (manually supplied; not fetched)'};
export function validateData(data){
 if(!data||typeof data!=='object'||Array.isArray(data)||Object.keys(data).length!==fields.length||!fields.every(k=>typeof data[k]==='string'&&data[k].length<=12000))throw Error('Expected exactly six text fields, each at most 12,000 characters.');
 if(!data.project.trim()||!data.facts.trim()||!data.next.trim())throw Error('Project, last verified state and next concrete action are required.');
 return Object.fromEntries(fields.map(k=>[k,data[k]]));
}
export function parseRecord(raw){
 const x=JSON.parse(raw);
 if(x?.format!=='returnpoint'||x.version!==1||typeof x.revision!=='string'||!x.revision||x.revision.length>100||typeof x.recordedAt!=='string'||!Number.isFinite(Date.parse(x.recordedAt)))throw Error('Unsupported or damaged ReturnPoint checkpoint.');
 return {format:'returnpoint',version:1,revision:x.revision,recordedAt:x.recordedAt,data:validateData(x.data)};
}
export function importRecord(raw){checkImportSize(raw);return parseRecord(raw);}
export function importDraft(raw){
 checkImportSize(raw);
 const d=JSON.parse(raw);
 if(d?.kind!=='returnpoint-recovery-draft'||d.version!==1||!d.data||Array.isArray(d.data)||Object.keys(d.data).length!==fields.length||!fields.every(k=>typeof d.data[k]==='string'&&d.data[k].length<=12000))throw Error('Unsupported or damaged recovery draft.');
 return Object.fromEntries(fields.map(k=>[k,d.data[k]]));
}
export function record(data){return {format:'returnpoint',version:1,revision:crypto.randomUUID(),recordedAt:new Date().toISOString(),data:validateData(data)};}
export async function commit(storage,locks,expected,data){
 if(!locks?.request)throw Error('Safe saving requires Web Locks on localhost in a supported browser. Export your draft instead.');
 return locks.request(KEY,()=>{
  const current=storage.getItem(KEY);
  if(current!==expected)throw Error('Conflict: another tab changed the checkpoint. Your draft is kept. Export it, then load the latest checkpoint before updating.');
  const next=record(data);const raw=JSON.stringify(next);storage.setItem(KEY,raw);
  if(storage.getItem(KEY)!==raw)throw Error('Storage did not confirm the write. Export your draft.');
  return {record:next,raw};
 });
}
