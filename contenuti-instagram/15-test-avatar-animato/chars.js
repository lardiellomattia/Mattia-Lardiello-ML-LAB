// Generatore personaggi ML LAB: Mattia, Sofia, Giulia
window.CHARS={
 mattia:{skin:'#e2b088',skin2:'#d9a47a',hair:'#2c1f17',style:'curly',female:false,top:'tee',topC:'#ffffff',topLine:'#d9d9d9',pants:'#1d1f24',shoe:'#f4f4f4',lips:'#6b2a2a',logo:true},
 sofia:{skin:'#efc6a8',skin2:'#e4b393',hair:'#3a2418',style:'long',female:true,top:'tank',topC:'#ffffff',topLine:'#dcdcdc',pants:'#15161a',flare:true,shoe:'#ffffff',lips:'#b2353f',necklace:true},
 giulia:{skin:'#f3d2bb',skin2:'#e9c0a5',hair:'#e4b54f',style:'ponytail',female:true,top:'bra',topC:'#ffbf00',topLine:'#e0a800',pants:'#4a4e57',shoe:'#ffffff',lips:'#c2526a'}
};
window.charSVG=function(p,c){
 const F=c.female, s=c.skin, s2=c.skin2;
 // body geometry
 const shL=F?126:100, shR=F?274:300, armX1=F?120:106, armX2=F?280:294, aw=F?32:50, fw=F?28:42, hr=F?19:24;
 let hairBack='', hairFront='';
 if(c.style==='curly'){
  hairFront=`<g fill="${c.hair}"><circle cx="140" cy="100" r="28"/><circle cx="165" cy="76" r="30"/><circle cx="200" cy="66" r="32"/><circle cx="236" cy="76" r="30"/><circle cx="260" cy="100" r="28"/><circle cx="130" cy="128" r="18"/><circle cx="270" cy="128" r="18"/><circle cx="182" cy="90" r="24"/><circle cx="218" cy="90" r="24"/></g><g fill="#46342a"><circle cx="160" cy="70" r="9"/><circle cx="205" cy="58" r="10"/><circle cx="245" cy="78" r="8"/></g>`;
 }
 if(c.style==='long'){
  hairBack=`<path id="${p}hairB" d="M118 140 Q112 60 200 56 Q288 60 282 140 L292 330 Q250 350 200 345 Q150 350 108 330 Z" fill="${c.hair}"/>`;
  hairFront=`<path d="M128 150 Q126 66 200 62 Q274 66 272 150 Q262 104 214 86 Q206 100 200 112 Q194 100 186 86 Q138 104 128 150 Z" fill="${c.hair}"/><path d="M200 66 L200 108" stroke="#2a190f" stroke-width="3"/><path d="M130 140 Q124 230 140 300 L156 300 Q142 220 146 150 Z" fill="${c.hair}"/><path d="M270 140 Q276 230 260 300 L244 300 Q258 220 254 150 Z" fill="${c.hair}"/>`;
 }
 if(c.style==='ponytail'){
  hairBack=`<path id="${p}pony" d="M262 70 Q330 70 318 160 Q312 230 290 260 Q300 190 280 120 Z" fill="${c.hair}"/>`;
  hairFront=`<path d="M128 150 Q124 62 200 58 Q276 62 272 150 Q262 98 200 92 Q140 98 128 150 Z" fill="${c.hair}"/><circle cx="262" cy="72" r="16" fill="#0b0b0b"/><path d="M150 96 Q190 80 240 92" stroke="#f2cd73" stroke-width="5" fill="none"/>`;
 }
 const face = F?`<ellipse cx="200" cy="150" rx="66" ry="80" fill="${s}"/>`:`<ellipse cx="200" cy="150" rx="70" ry="82" fill="${s}"/>`;
 const lashes = F?`<path d="M156 128 l-8 -6 M160 125 l-5 -8 M240 128 l8 -6 M236 125 l5 -8" stroke="#1a1210" stroke-width="3" stroke-linecap="round"/>`:'';
 const blush = F?`<ellipse cx="160" cy="178" rx="14" ry="7" fill="#f19a9a" opacity=".35"/><ellipse cx="240" cy="178" rx="14" ry="7" fill="#f19a9a" opacity=".35"/>`:'';
 // torso
 let torso='';
 if(!F){
  torso=`<path d="M100 268 Q200 236 300 268 L306 330 L276 336 L262 480 L138 480 L124 336 L94 330 Z" fill="${c.topC}" stroke="${c.topLine}" stroke-width="3"/>
  <path d="M150 318 Q175 336 198 322 M202 322 Q225 336 250 318" fill="none" stroke="${c.topLine}" stroke-width="4"/>
  <path d="M175 252 Q200 275 225 252" fill="none" stroke="${c.topLine}" stroke-width="5"/>
  <rect x="168" y="360" width="64" height="24" rx="5" fill="#0b0b0b"/><text x="200" y="378" text-anchor="middle" font-family="Anton" font-size="17" fill="#ffbf00">ML LAB</text>`;
 } else {
  // skin torso (waist + hips)
  torso=`<path d="M128 268 Q200 250 272 268 L262 360 Q252 400 258 440 L142 440 Q148 400 138 360 Z" fill="${s}"/>`;
  if(c.top==='tank') torso+=`<path d="M150 262 Q200 248 250 262 L262 300 Q256 350 262 395 L138 395 Q144 350 138 300 Z" fill="${c.topC}" stroke="${c.topLine}" stroke-width="2"/><path d="M176 256 Q200 266 224 256" fill="none" stroke="${c.topLine}" stroke-width="4"/>`+[160,175,190,205,220,235].map(x=>`<line x1="${x}" y1="300" x2="${x}" y2="392" stroke="${c.topLine}" stroke-width="2"/>`).join('');
  if(c.top==='bra') torso+=`<path d="M146 270 Q200 258 254 270 L260 340 Q200 352 140 340 Z" fill="${c.topC}" stroke="${c.topLine}" stroke-width="3"/><rect x="140" y="332" width="120" height="12" rx="4" fill="#0b0b0b"/><text x="200" y="342" text-anchor="middle" font-family="Anton" font-size="10" fill="#ffbf00">ML LAB</text>`;
  if(c.necklace) torso+=`<path d="M182 252 Q200 280 218 252" fill="none" stroke="#d8b25a" stroke-width="2"/><circle cx="200" cy="270" r="3" fill="#d8b25a"/>`;
 }
 // legs
 let legs;
 if(!F) legs=`<path d="M140 470 L132 735 L192 735 L198 520 L202 520 L208 735 L268 735 L260 470 Z" fill="${c.pants}"/><line x1="200" y1="520" x2="200" y2="735" stroke="#33363d" stroke-width="3"/>`;
 else if(c.flare) legs=`<path d="M142 430 Q128 500 140 560 L118 738 L192 738 L196 560 L200 520 L204 560 L208 738 L282 738 L260 560 Q272 500 258 430 Z" fill="${c.pants}"/><text x="200" y="455" text-anchor="middle" font-family="Inter" font-weight="800" font-size="11" fill="#bbb">BMBFT</text>`;
 else legs=`<path d="M142 430 Q126 500 142 570 L150 735 L192 735 L196 560 L200 520 L204 560 L208 735 L250 735 L258 570 Q274 500 258 430 Z" fill="${c.pants}"/><path d="M144 440 L256 440" stroke="#0b0b0b" stroke-width="10"/>`;
 const shoes=`<ellipse cx="160" cy="745" rx="${F?38:46}" ry="${F?16:20}" fill="${c.shoe}"/><ellipse cx="240" cy="745" rx="${F?38:46}" ry="${F?16:20}" fill="${c.shoe}"/>`;
 const arm=(n,x,sl)=>`<g id="${p}arm${n}" style="transform-origin:${x}px 288px">
   <rect x="${x-aw/2}" y="${F?282:296}" width="${aw}" height="${F?102:94}" rx="${aw/2}" fill="${s2}"/>
   ${F?'':`<ellipse cx="${x}" cy="336" rx="27" ry="34" fill="${s2}"/>`}
   <g id="${p}fore${n}" style="transform-origin:${x}px 384px">
     <rect x="${x-fw/2}" y="376" width="${fw}" height="98" rx="${fw/2}" fill="${s2}"/>
     <circle cx="${x}" cy="484" r="${hr}" fill="${s2}"/>
   </g>${sl}
 </g>`;
 const sleeve=(x)=>F?'':`<path d="M${x-30} 270 Q${x} 256 ${x+30} 270 L${x+30} 322 L${x-30} 322 Z" fill="${c.topC}" stroke="${c.topLine}" stroke-width="2"/>`;
 return `<g id="${p}body">
  ${hairBack}
  ${legs}${shoes}
  ${torso}
  ${arm('L',armX1,sleeve(armX1))}${arm('R',armX2,sleeve(armX2))}
  <rect x="${F?182:176}" y="212" width="${F?36:48}" height="46" rx="12" fill="${s2}"/>
  <g id="${p}head" style="transform-origin:200px 230px">
   ${F && c.style==='long' ? '' : ''}
   ${face}
   <ellipse cx="${F?132:128}" cy="158" rx="11" ry="18" fill="${s2}"/><ellipse cx="${F?268:272}" cy="158" rx="11" ry="18" fill="${s2}"/>
   ${F?`<circle cx="132" cy="178" r="4" fill="#d8b25a"/><circle cx="268" cy="178" r="4" fill="#d8b25a"/>`:''}
   ${blush}
   <ellipse id="${p}mouth" cx="200" cy="${F?196:200}" rx="${F?13:16}" ry="${F?4:5}" fill="${c.lips}"/>
   <path d="M200 150 Q193 174 200 178 Q206 176 205 173" fill="none" stroke="${F?'#d39d7c':'#b8845e'}" stroke-width="3.5" stroke-linecap="round"/>
   <ellipse cx="172" cy="140" rx="15" ry="15" fill="#fff"/><ellipse cx="228" cy="140" rx="15" ry="15" fill="#fff"/>
   <circle id="${p}pL" cx="174" cy="142" r="8" fill="#2a1d14"/><circle id="${p}pR" cx="230" cy="142" r="8" fill="#2a1d14"/>
   ${lashes}
   <rect id="${p}lidL" x="155" y="122" width="34" height="0" fill="${s}"/><rect id="${p}lidR" x="211" y="122" width="34" height="0" fill="${s}"/>
   <path id="${p}browL" d="M154 ${F?116:118} Q172 ${F?106:108} 190 ${F?114:116}" fill="none" stroke="${F?'#3a2418':'#2c1f17'}" stroke-width="${F?6:8}" stroke-linecap="round"/>
   <path id="${p}browR" d="M210 ${F?114:116} Q228 ${F?106:108} 246 ${F?116:118}" fill="none" stroke="${F?'#3a2418':'#2c1f17'}" stroke-width="${F?6:8}" stroke-linecap="round"/>
   ${hairFront}
  </g>
 </g>`;
};
// pose helper
window.poseChar=function(p,o){
 const $=id=>document.getElementById(p+id);
 $('armL').style.transform=`rotate(${o.uL||0}deg)`;$('armR').style.transform=`rotate(${o.uR||0}deg)`;
 $('foreL').style.transform=`rotate(${o.fL||0}deg)`;$('foreR').style.transform=`rotate(${o.fR||0}deg)`;
 $('head').style.transform=`rotate(${o.head||0}deg)`;
 $('body').setAttribute('transform',`translate(0 ${o.bob||0})`);
 $('mouth').setAttribute('ry',(o.mouth!=null?o.mouth:4).toFixed(1));
 ['lidL','lidR'].forEach(i=>$(i).setAttribute('height',o.lid||0));
 const lx=o.look||0; $('pL').setAttribute('cx',174+lx); $('pR').setAttribute('cx',230+lx);
};
