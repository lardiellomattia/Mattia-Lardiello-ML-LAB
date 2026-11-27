import sys,re
D=sys.argv[1]; T=sys.argv[2]
s=open(D+'/trailer.html').read()
# --- bar background replaces salon svg
a=s.index('<div id="salon" class="scene">'); b=s.index('<svg class="abs" id="cP"')
bar='''<div id="salon" class="scene">
 <svg class="abs" width="1080" height="1920" style="left:0;top:0">
  <rect x="0" y="0" width="1080" height="1500" fill="#f1ebe3"/>
  <rect x="0" y="0" width="1080" height="120" fill="#2b2d33"/>
  <!-- shelves with bottles/cups -->
  <rect x="80" y="420" width="420" height="14" rx="4" fill="#9a6b45"/><rect x="80" y="600" width="420" height="14" rx="4" fill="#9a6b45"/>
  <g fill="#fff" stroke="#ccc" stroke-width="3"><rect x="110" y="370" width="44" height="50" rx="8"/><rect x="170" y="370" width="44" height="50" rx="8"/><rect x="230" y="370" width="44" height="50" rx="8"/></g>
  <g><rect x="310" y="330" width="34" height="90" rx="10" fill="#7fb37f"/><rect x="360" y="345" width="34" height="75" rx="10" fill="#e9a35b"/><rect x="410" y="320" width="34" height="100" rx="10" fill="#c9566a"/></g>
  <g><rect x="120" y="540" width="60" height="60" rx="10" fill="#ffbf00"/><rect x="200" y="545" width="60" height="55" rx="10" fill="#e4e7ee"/><rect x="280" y="540" width="60" height="60" rx="10" fill="#ffbf00"/></g>
  <!-- menu board -->
  <rect x="620" y="260" width="380" height="300" rx="16" fill="#2b2d33" stroke="#9a6b45" stroke-width="12"/>
  <text x="810" y="330" text-anchor="middle" font-family="Anton" font-size="46" fill="#ffbf00">BAR</text>
  <g font-family="Inter" font-weight="700" font-size="28" fill="#eee"><text x="660" y="390">Caffè ........ 1,20</text><text x="660" y="440">Cappuccino .. 1,60</text><text x="660" y="490">Spremuta ..... 3,00</text></g>
  <!-- pendant lamps -->
  <g><line x1="300" y1="120" x2="300" y2="200" stroke="#2b2d33" stroke-width="4"/><path d="M260 200 h80 l-14 40 h-52 z" fill="#ffbf00"/><line x1="780" y1="120" x2="780" y2="200" stroke="#2b2d33" stroke-width="4"/><path d="M740 200 h80 l-14 40 h-52 z" fill="#ffbf00"/></g>
  <!-- bar counter (behind characters' legs) -->
  <rect x="0" y="1500" width="1080" height="420" fill="#cdb79f"/><rect x="0" y="1490" width="1080" height="14" fill="#9a6b45"/>
  <ellipse cx="250" cy="1745" rx="170" ry="24" fill="#0002"/><ellipse cx="830" cy="1745" rx="170" ry="24" fill="#0002"/>
 </svg>
 '''
s=s[:a]+bar+s[b:]
# characters: left = Sofia (b_), right = Amica
s=s.replace('<svg class="abs" id="cP"','<svg class="abs" id="cB"')
s=s.replace("document.getElementById('cP').innerHTML=charSVG('p_',CHARS.parrucchiera);","document.getElementById('cB').innerHTML=charSVG('b_',CHARS.sofia);")
# bar table + coffees in front
s=s.replace('<div id="tP" class="abs tag"','''<svg class="abs" width="1080" height="400" style="left:0;top:1430px"><rect x="380" y="70" width="320" height="22" rx="10" fill="#9a6b45"/><rect x="530" y="92" width="20" height="230" fill="#6b4a30"/><ellipse cx="540" cy="325" rx="80" ry="14" fill="#6b4a30"/>
 <g><rect x="440" y="30" width="44" height="40" rx="8" fill="#fff" stroke="#ccc" stroke-width="3"/><path d="M484 40 q16 0 16 14 q0 12 -16 12" fill="none" stroke="#ccc" stroke-width="5"/><rect x="590" y="30" width="44" height="40" rx="8" fill="#fff" stroke="#ccc" stroke-width="3"/><path d="M634 40 q16 0 16 14 q0 12 -16 12" fill="none" stroke="#ccc" stroke-width="5"/></g></svg>
 <div id="tP" class="abs tag"''')
s=s.replace('>LA PARRUCCHIERA</div>','>SOFIA</div>')
s=s.replace('Le frasi che senti<br>dalla <span class="y">parrucchiera</span> 💇‍♀️','Quell\'amica<br>che <span class="y">sa tutto</span> 🤓📱')
# myths all by amica (g)
s=re.sub(r"const MY=\[.*?\];","const MY=[[2.25,4.65,5.25,'g','\"Fidati! Con i pesi diventi <span class=y>grossa</span>!\"'],[5.15,7.15,8.0,'g','\"Per la pancia fai gli <span class=y>addominali</span>!\"'],[7.95,10.85,12.05,'g','\"E se smetti di allenarti il muscolo diventa <span class=y>grasso</span>!\"']];",s,flags=re.S)
s=s.replace("const WHO={p:['LA PARRUCCHIERA','#a8412a','#fff',255],g:[\"L'AMICA\",'#ffbf00','#0b0b0b',830]};","const WHO={g:[\"L'AMICA CHE SA TUTTO\",'#ffbf00','#0b0b0b',830]};")
s=s.replace("$('bub').style.left=(m[3]=='p'?40:440)+'px'","$('bub').style.left='420px'").replace("$('bub').style.transformOrigin=m[3]=='p'?'20% 100%':'80% 100%';","$('bub').style.transformOrigin='80% 100%';")
# poses in bar
old=s[s.index("  for(const [k,p,ph] of [['p','p_',0],['g','g_',1.4]]){"):s.index("  $('tP').style.transform")]
new='''  for(const [k,p,ph] of [['b','b_',0],['g','g_',1.4]]){
   const mv=(TL.env[k]||[])[fi]||0; const o={uL:8,uR:-8,mouth:2.5+mv*12,look: k=='b'?5:-5};
   if(t<2.3){o.mouth=2.5+Math.max(0,Math.sin(t*16+(k=='b'?0:2)))*6*((Math.floor(t*1.6)+(k=='b'?0:1))%2);}
   if(k=='g' && mi>=0 && t<MY[mi][1]){ if(mi==0){o.uR=-160;o.fR=-10;} if(mi==1){o.uR=-35;o.fR=-70;o.uL=40;o.fL=110;} if(mi==2){o.uR=-150;o.fR=-25+Math.sin(t*14)*20;o.uL=150;o.fL=25-Math.sin(t*14)*20;} }
   if(k=='b' && mi>=0){ o.mouth=mi==2?9:2.5; if(mi>=1){o.uR=12;o.fR=160;o.head=-8;} }
   if(mi>=0 && t>=MY[mi][1]){o.head=k=='b'? Math.sin(t*12)*8 : 6;}
   idle(p,t,ph,o);
  }
'''
s=s.replace(old,new)
s=s.replace("$('tP').style.transform=`translateX(-50%) scale(${sp=='p'?1.1:1})`;","$('tP').style.transform=`translateX(-50%)`;")
s=s.replace("$('tP').style.background=sp=='p'?'#ffbf00':'#0b0b0b';$('tP').style.color=sp=='p'?'#0b0b0b':'#ffbf00';","")
s=s.replace('>L\'AMICA</div>','>L\'AMICA CHE SA TUTTO</div>').replace('id="tG" class="abs tag" style="left:830px;top:1790px"','id="tG" class="abs tag" style="left:800px;top:1790px;font-size:36px"')
# title & cta
s=s.replace('Sentito<br>dalla<br><span class="y">parrucchiera</span>','L\'amica<br>che sa<br><span class="y">tutto</span>')
s=s.replace('💇‍♀️ 🏋️‍♂️','🤓📱')
s=s.replace('Qual è il mito<br>che hai sentito?','Tagga l\'amica<br>che sa tutto')
s=s.replace('Scrivilo nei commenti 👇<br>potrebbe diventare il prossimo episodio','e scrivimi il consiglio più assurdo che ti ha dato 👇<br>potrebbe diventare il prossimo episodio')
s=s.replace('__TL__',open(T+'/trailer2_tl.json').read())
open(D+'/trailer2_r.html','w').write(s)
print('ok')
