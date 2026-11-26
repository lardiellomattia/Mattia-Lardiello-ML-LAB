import sys
D=sys.argv[1]; T=sys.argv[2]
s=open(D+'/team.html').read()
tl=open(T+'/timeline.json').read()
css='''.card{left:40px;right:40px;top:150px;background:#fff;border-radius:34px;padding:34px 40px 38px;box-shadow:0 12px 0 #0b0b0b;border:5px solid #0b0b0b;transform-origin:50% 100%}
.who{display:inline-block;font-family:Anton;font-size:38px;padding:4px 18px 8px;border-radius:10px;margin-bottom:12px}
.txt{font-size:56px;font-weight:900;line-height:1.15;color:#0b0b0b}
.txt .y{color:#0b0b0b;background:linear-gradient(180deg,transparent 55%,#ffbf00 55%)}
.it{display:flex;gap:14px;align-items:center;font-size:36px;font-weight:800;margin-top:6px;opacity:0}
.ck{flex:none;width:52px;height:52px;border-radius:50%;background:#ffbf00;display:flex;align-items:center;justify-content:center;font:900 30px Inter}
#tail{position:absolute;width:0;height:0;border-left:26px solid transparent;border-right:26px solid transparent;border-top:40px solid #0b0b0b;bottom:-44px}
</style>'''
s=s.replace('</style>',css,1)
a=s.index('<div id="cap"');b=s.index('<div id="tS"')
s=s[:a]+'''<div id="card" class="abs card"><div id="who" class="who"></div><div id="txt" class="txt"></div>
 <div id="list"><div class="it" id="i1"><div class="ck">✓</div>Appoggio del piede</div><div class="it" id="i2"><div class="ck">✓</div>Bacino stabile</div><div class="it" id="i3"><div class="ck">✓</div>Carico che cresce nel tempo</div></div>
 <div id="tail"></div></div>
 '''+s[b:]
a=s.index('const cl=');b=s.index('render(0);')
js=open(D+'/dialog_logic.js').read().replace('__TL__',tl)
s=s[:a]+js+s[b:]
s=s.replace('<text x="480" y="203" text-anchor="middle" font-family="Anton" font-size="56" fill="#ffbf00">ML LAB</text>','').replace('<rect x="330" y="140" width="300" height="90" rx="14" fill="#0b0b0b"/>','')
open(D+'/dialog.html','w').write(s)
print('ok')
