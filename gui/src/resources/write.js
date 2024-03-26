const{ensureDirSync:ensureDirSync,readFileSync:readFileSync,writeFileSync:writeFileSync,readdirSync:readdirSync}=require("fs-extra"),{join:join}=require("path"),{exit:exit}=require("process"),start=performance.now(),DEBUG=!1;function merge401(e){let t,s=-1,r=!1;const i=[];for(let n=0;n<e.length;n++){const a=e[n];401===a.code?(t||(t=n),s++,i.push(a.parameters[0]),r=!0):n>0&&r&&t&&(e[t].parameters[0]=i.join("\n"),e.splice(t+1,s),i.length=0,n-=s,s=-1,t=void 0,r=!1)}return e}function mergeMap401(e){const t=JSON.parse(readFileSync(e,"utf8"));for(const[e,s]of t?.events?.entries()||[])for(const[r,i]of s?.pages?.entries()||[])t.events[e].pages[r].list=merge401(i.list);return t}function mergeOther401(e){const t=JSON.parse(readFileSync(e,"utf8"));for(const e of t)if(e?.pages)for(const[t,s]of e.pages.entries())e.pages[t].list=merge401(s.list);else e?.list&&(e.list=merge401(e.list));return t}const dirPaths={original:join(__dirname,"./original"),output:join(__dirname,"../../../../data"),maps:join(__dirname,"../../../../copies/maps/maps.txt"),mapsTrans:join(__dirname,"../../../../copies/maps/maps_trans.txt"),names:join(__dirname,"../../../../copies/maps/names.txt"),namesTrans:join(__dirname,"../../../../copies/maps/names_trans.txt"),other:join(__dirname,"../../../../copies/other"),plugins:join(__dirname,"../../../../translation/plugins")},mapsJSON=readdirSync(dirPaths.original).filter((e=>e.startsWith("Map"))).map((e=>mergeMap401(join(dirPaths.original,e)))),otherJSON=readdirSync(dirPaths.original).filter((e=>!["Map","Tilesets","Animations","States","System"].some((t=>e.startsWith(t))))).map((e=>mergeOther401(join(dirPaths.original,e)))),systemJSON=JSON.parse(readFileSync(join(dirPaths.original,"System.json"),"utf8"));function extractPluginsJSON(){const e=join(dirPaths.plugins,"plugins.js"),t=readFileSync(e,"utf8").split("\n"),s=[];for(let e=3;e<t.length-1;e++)s.push(t[e]);return s.join("").slice(0,-1)}function isUselessLine(e){return e.includes("_")||e.includes("---")||/\d$|[A-Z\s]+$|[A-Z]+$/.test(e)||["gfx","WakeUP","LegHURT","smokePipe","DEFAULT CHARACTER","RITUAL CIRCLE","GameOver","deathCheck","REMOVEmembers","Beartrap","TransferSTATStoFUSION","PartyREARRANGE","SKILLSdemonSeedAVAILABLE","TransferSKILLStoMARRIAGE","counter-magic Available?","greater magic Available?","Blood sacrifice Available?","Back from Mahabre","BLINDNESS?","Crippled?","WhileBackstab","TransferSTATStoMARRIAGE"].includes(e)||["//","??","RANDOM","Empty scroll","TALK"].some((t=>e.startsWith(t)))}function writeMaps(e,t,s){const r=readdirSync(dirPaths.original).filter((e=>e.startsWith("Map"))),i=readFileSync(t,"utf8").split("\n"),n=readFileSync(s,"utf8").split("\n"),a=new Map(i.map(((e,t)=>[e.replaceAll("\\n[","\\N[").replaceAll("\\n","\n"),n[t].replaceAll("\\n","\n").trim()]))),o=readFileSync(dirPaths.names,"utf8").split("\n"),l=readFileSync(dirPaths.namesTrans,"utf8").split("\n"),c=new Map(o.map(((e,t)=>[e.trim(),l[t].trim()])));for(const[t,s]of e.entries()){const e=s,i=dirPaths.output;ensureDirSync(i);const n=join(i,r[t]),o=e?.displayName;c.has(o)&&(e.displayName=c.get(o));for(const t of e?.events||[])for(const e of t?.pages||[])for(const t of e.list){const e=t.code;for(const[s,r]of t.parameters.entries()){const i=Array.isArray(r)||"string"!=typeof r?void 0:r.replaceAll("\\n[","\\N[");if(void 0===i){if(102===e&&Array.isArray(r))for(const[e,i]of r.entries())if("string"==typeof i){const r=i.replaceAll("\\n[","\\N[");a.has(r)&&(t.parameters[s][e]=a.get(r))}}else(401===e||402===e||324===e||356===e&&(i.startsWith("GabText")||i.startsWith("choice_text")&&!i.endsWith("????")))&&a.has(i)&&(t.parameters[s]=a.get(i))}}writeFileSync(n,JSON.stringify(e),"utf8"),console.log(`Записан файл ${r[t]}.`)}}function writeOther(e,t,s){const r=readdirSync(dirPaths.original).filter((e=>!["Map","Tilesets","Animations","States","System"].some((t=>e.startsWith(t))))),i=readdirSync(t).map((e=>{if(!e.endsWith("_trans.txt")&&!e.startsWith("System"))return readFileSync(join(t,e),"utf8").split("\n")})).filter((e=>void 0!==e)),n=readdirSync(s).map((e=>{if(e.endsWith("_trans.txt")&&!e.startsWith("System"))return readFileSync(join(s,e),"utf8").split("\n")})).filter((e=>void 0!==e));for(const[t,s]of e.entries()){const e=s,a=dirPaths.output,o=new Map(i[t].map(((e,s)=>[e.replaceAll("\\n","\n"),n[t][s].replaceAll("\\n","\n")])));ensureDirSync(a);const l=join(a,r[t]);for(const t of e){if(!t)continue;if(!t.pages)if(t.list){const e=t.name;e&&!isUselessLine(e)&&o.has(e)&&(t.name=o.get(e))}else{const e=["name","description","note"],s=["Alchem","Recipes","Rifle","NLU","The Last","Soldier's","The Tale","Half-Cocooned","Ratkin"];for(const r of e)t[r]&&("note"===r||!isUselessLine(t[r])||t[r].endsWith("phobia")||s.some((e=>t[r].startsWith(e))))&&o.has(t[r])&&(t[r]=o.get(t[r]))}const e=void 0!==t.pages?t.pages.length:1;for(let s=0;s<e;s++){const r=1!==e?t.pages[s]:t;for(const e of r.list||[]){const t=e.code;for(const[s,r]of e.parameters.entries()){const i=Array.isArray(r)||"string"!=typeof r?void 0:r.replaceAll("\\n[","\\N[");if(void 0===i){if(102===t&&Array.isArray(r))for(const[t,i]of r.entries())if("string"==typeof i){const r=i.replaceAll("\\n[","\\N[");o.has(r)&&(e.parameters[s][t]=o.get(r))}}else(401===t||402===t||108===t||356===t&&(i.startsWith("choice_text")||i.startsWith("GabText"))&&!i.endsWith("????"))&&o.has(i)&&(e.parameters[s]=o.get(i))}}}}writeFileSync(l,JSON.stringify(e),"utf8"),console.log(`Записан файл ${r[t]}.`)}}function writeSystem(e,t,s){const r=e,i=readFileSync(t,"utf8").split("\n"),n=readFileSync(s,"utf8").split("\n"),a=new Map(i.map(((e,t)=>[e,n[t]])));for(const[e,t]of r.equipTypes.entries())t&&a.has(t)&&(r.equipTypes[e]=a.get(t));for(const[e,t]of r.skillTypes.entries())t&&a.has(t)&&(r.skillTypes[e]=a.get(t));for(const[e,t]of r.variables.entries())if(t.endsWith("phobia")&&(a.has(t)&&(r.variables[e]=a.get(t)),"Panophobia"===t))break;for(const e in r.terms)if("messages"!==e)for(const[t,s]of r.terms[e].entries())s&&a.has(s)&&(r.terms[e][t]=a.get(s));else for(const e in r.terms.messages){const t=r.terms.messages[e];t&&a.has(t)&&(r.terms.messages[e]=a.get(t))}writeFileSync(join(dirPaths.output,"System.json"),JSON.stringify(r),"utf8"),console.log("Записан файл System.json.")}function writePlugins(e,t,s){const r=e,i=Array.from(new Set(readFileSync(t,"utf8").split("\n"))),n=Array.from(new Set(readFileSync(s,"utf8").split("\n"))),a=new Map(i.map(((e,t)=>[e,n[t]])));for(const e of r){const t=e.name;if(["YEP_BattleEngineCore","YEP_OptionsCore","SRD_NameInputUpgrade","YEP_KeyboardConfig","YEP_ItemCore","YEP_X_ItemDiscard","YEP_EquipCore","YEP_ItemSynthesis","ARP_CommandIcons","YEP_X_ItemCategories","Olivia_OctoBattle"].includes(t))for(const t in e.parameters){const s=e.parameters[t];a.has(s)&&(e.parameters[t]=a.get(s))}}ensureDirSync("./js"),writeFileSync(join("./js","plugins.js"),"// Generated by RPG Maker.\n// Do not edit this file directly.\nvar $plugins =\n"+JSON.stringify(r),"utf8"),console.log("Записан файл plugins.js.")}writeMaps(mapsJSON,dirPaths.maps,dirPaths.mapsTrans),writeOther(otherJSON,dirPaths.other,dirPaths.other),writeSystem(systemJSON,join(dirPaths.other,"System.txt"),join(dirPaths.other,"System_trans.txt")),console.log("Все файлы успешно записаны."),console.log(`Потрачено ${(performance.now()-start)/1e3} секунд.`);