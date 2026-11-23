const fs=require('fs');const js=fs.readFileSync(__dirname+'/index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const grab=(a,b)=>js.slice(js.indexOf(a),js.indexOf(b));const pad=n=>String(n).padStart(2,'0');
eval(grab('const DEF=','const pad=').replace(/^const /gm,'var '));
eval(grab('const cents=','const dur=').replace(/^const /gm,'var '));var hora=()=>'';
var S={cfg:{tarifas:{auto:{modo:'hora',t30:.5,t59:1,h1:1},camioneta:{modo:'hora',t30:.5,t59:1.25,h1:1.25},moto:{modo:'hora',t30:.5,t59:.75,h1:.75}},extra15:.25,tope:0}};
eval(grab('const cfg=','const salidas=').replace('const cfg','var cfg'));
eval(grab('function calc(','function normPlaca'));
let ok=0,fail=0;const C=(t,m,s=0)=>calc({tipo:t,entrada:0},(m*60+s)*1000).total;
const T=(n,r,e)=>{if(r===e)ok++;else{fail++;console.log('FALLA',n,r,'esperado',e)}};
console.log('Tus ejemplos para AUTO:');
[[60,1],[70,1],[75,1],[76,1.25],[90,1.25],[91,1.5],[106,1.75],[120,1.75],[135,1.75],[136,2]].forEach(([m,e])=>{const r=C('auto',m);console.log(`  ${Math.floor(m/60)}h ${pad(m%60)}m → ${usd(r)} ${r===e?'✔':'✘'}`);T('auto '+m,r===e?r:r,e)});
// referencia independiente: precio = primera hora + 0,25 por cada bloque de 15 min que empieza después de los 15 min libres de cada hora
const ref=(t,m)=>{const b={auto:[.5,1],camioneta:[.5,1.25],moto:[.5,.75]}[t];if(m<=30)return b[0];if(m<=60)return b[1];let c=Math.round(b[1]*100);for(let x=61;x<=m;x++){const r=(x-60)%60;const pos=r===0?60:r; if(pos===16||pos===31||pos===46)c+=25}return c/100};
let n=0;for(const t of ['auto','camioneta','moto'])for(let m=0;m<=1440;m++){T(t+' '+m,C(t,m),ref(t,m));n++}
console.log('Comparación minuto a minuto de 0 a 24 h contra un cálculo independiente: '+n+' casos');
console.log('Segundos (no sube antes de terminar el intervalo):');
[[30,59,.5],[60,59,1],[75,59,1],[76,0,1.25],[135,59,1.75]].forEach(([m,s,e])=>{const r=C('auto',m,s);console.log(`  auto ${m}m ${s}s → ${usd(r)}`);T('seg',r,e)});
console.log('Duraciones largas:');
for(const [lbl,m] of [['10 min',10],['8 horas',480],['12 horas',720],['24 horas',1440]])console.log(`  ${lbl.padEnd(9)} auto ${usd(C('auto',m))} · camioneta ${usd(C('camioneta',m))} · moto ${usd(C('moto',m))}`);
console.log(`\nResultado: ${ok} comprobaciones OK, ${fail} fallas`);process.exit(fail?1:0);
