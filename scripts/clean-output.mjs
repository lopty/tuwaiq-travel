import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
for(const name of (process.argv[2]==='all'?['dist','dist-ssr']:['dist-ssr'])){
 const target=path.resolve(root,name);
 if(path.dirname(target)!==root||!['dist','dist-ssr'].includes(path.basename(target)))throw Error('Unexpected output target');
 await fs.rm(target,{recursive:true,force:true});
}
