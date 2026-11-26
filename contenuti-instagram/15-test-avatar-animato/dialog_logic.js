const TL=__TL__;
const TX=[
 'Faccio 100 squat a settimana… ma i miei <span class="y">glutei</span> non crescono! 😩',
 'Anche io! Devo allenarmi ancora di <span class="y">più</span>?',
 'Il problema non è <span class="y">QUANTO</span> ti alleni, ma <span class="y">COME</span>',
 'Io guardo 3 cose:',
 'Quindi non serve fare più squat? 🤔',
 'Ogni corpo è diverso: l\'esercizio si <span class="y">adatta</span> a te',
 'Voglio la <span class="y">parte 2</span>! 🙌',
 'Seguimi per la parte 2 👇'];
const WHO={m:['MATTIA','#0b0b0b','#ffbf00',540],s:['SOFIA','#fff','#0b0b0b',190],g:['GIULIA','#ffbf00','#0b0b0b',890]};
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const backOut=x=>{const c=1.70158;x=cl(x);return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const $=id=>document.getElementById(id);
window.render=function(t){
 let li=0; TL.lines.forEach((l,i)=>{if(t>=l[1]-0.15) li=i;});
 const L=TL.lines[li], sp=L[0], lt=t-(L[1]-0.15);
 if($('card').dataset.i!=li){$('card').dataset.i=li;const w=WHO[sp];$('who').textContent=w[0];$('who').style.background=w[1];$('who').style.color=w[2];$('who').style.border='3px solid #0b0b0b';$('txt').innerHTML=TX[li];$('list').style.display=li==3?'block':'none';$('tail').style.left=(Math.max(40,Math.min(900,w[3]-40-26)))+'px';}
 const k=backOut(lt/.3); $('card').style.transform=`scale(${0.75+0.25*Math.min(k,1.06)})`;
 [['i1',10.77],['i2',11.85],['i3',12.87]].forEach(([id,st])=>{const p=cl((t-st)/.25);$(id).style.opacity=p;$(id).style.transform=`translateX(${(1-p)*40}px)`;});
 const fi=Math.min(Math.round(t*30),TL.env.m.length-1);
 const people={m:['m_',0],s:['s_',1.3],g:['g_',2.6]};
 for(const [k,[p,ph]] of Object.entries(people)){
  const bp=((t+ph)%3.3); const lid=bp<0.12?34*Math.sin(bp/0.12*Math.PI):0;
  const mv=(TL.env[k]||[])[fi]||0;
  const talking = k==sp && t>=L[1] && t<=L[2]+0.1;
  const look = k==sp? 0 : (WHO[sp][3]>WHO[k][3]? 5:-5);
  const o={bob:Math.sin((t+ph)*2*Math.PI*1.1)*2.4,head:Math.sin((t+ph)*2.3)*3+(talking?Math.sin(t*5)*3:0),uL:8,uR:-8,lid,look,mouth:2.5+mv*12};
  if(talking){
   if(k=='s'&&li==0){o.uR=12;o.fR=160;o.head=-8;}
   if(k=='s'&&li==4){o.uR=-30;o.fR=-70;o.uL=30;o.fL=70;}
   if(k=='g'&&li==1){o.uR=-35;o.fR=-70;o.uL=35;o.fL=70;}
   if(k=='g'&&li==6){o.uR=-150;o.fR=-25+Math.sin(t*14)*20;o.uL=150;o.fL=25-Math.sin(t*14)*20;}
   if(k=='m'&&li==2){o.uR=-40;o.fR=-60+Math.sin(t*9)*8;o.uL=40;o.fL=60-Math.sin(t*9)*8;}
   if(k=='m'&&li==3){o.uR=-160;o.fR=-5;}
   if(k=='m'&&li==5){o.uR=-45;o.fR=-35;o.uL=45;o.fL=35;}
   if(k=='m'&&li==7){o.uR=-150;o.fR=-25+Math.sin(t*14)*20;}
  }
  poseChar(p,o);
  const el=$('c'+k.toUpperCase()); el.style.transformOrigin='50% 100%'; el.style.transform=`scale(${k==sp?1.04:1})`;
 }
 [['tS','s'],['tM','m'],['tG','g']].forEach(([id,k])=>{$(id).style.transform=`translateX(-50%) scale(${k==sp?1.12:1})`;$(id).style.background=k==sp?'#ffbf00':'#0b0b0b';$(id).style.color=k==sp?'#0b0b0b':'#ffbf00';});
};
