import React, { useState } from 'react';
import { restaurants, categories } from './data.js';

const COLORS = {
  green: '#0f4d2a', greenLight: '#e6f0eb', greenDark: '#0a3520',
  gold: '#C5960C', bg: '#F7F7F5', cardWhite: '#FFFFFF',
  textDark: '#111111', textMid: '#4a4a4a', textLight: '#777777', border: '#E2E2DF',
};

const PHOTOS = {
  burger:'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?w=400&h=280&fit=crop',
  bbq:'https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?w=400&h=280&fit=crop',
  wings:'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?w=400&h=280&fit=crop',
  kbbq:'https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?w=400&h=280&fit=crop',
  biryani:'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?w=400&h=280&fit=crop',
  kabob:'https://images.pexels.com/photos/6210876/pexels-photo-6210876.jpeg?w=400&h=280&fit=crop',
  shawarma:'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?w=400&h=280&fit=crop',
  pizza:'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?w=400&h=280&fit=crop',
  noodles:'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?w=400&h=280&fit=crop',
  pho:'https://images.pexels.com/photos/3582379/pexels-photo-3582379.jpeg?w=400&h=280&fit=crop',
  tacos:'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=400&h=280&fit=crop',
  rice:'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?w=400&h=280&fit=crop',
  diner:'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?w=400&h=280&fit=crop',
  seafood:'https://images.pexels.com/photos/1268549/pexels-photo-1268549.jpeg?w=400&h=280&fit=crop',
  default:'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?w=400&h=280&fit=crop',
};

const TAG_PHOTO_RULES = [
  {keywords:['pho','vietnamese'],photo:'pho'},
  {keywords:['kbbq','korean bbq','korean'],photo:'kbbq'},
  {keywords:['shawarma','wrap'],photo:'shawarma'},
  {keywords:['kabob','kabab','kebab'],photo:'kabob'},
  {keywords:['wings'],photo:'wings'},
  {keywords:['diner','breakfast'],photo:'diner'},
  {keywords:['burger','burgers','smash'],photo:'burger'},
  {keywords:['bbq','smokehouse','ribs'],photo:'bbq'},
  {keywords:['pizza'],photo:'pizza'},
  {keywords:['biryani','karahi','nihari'],photo:'biryani'},
  {keywords:['taco','tacos','mexican'],photo:'tacos'},
  {keywords:['noodle','ramen','chinese','thai','stir fry'],photo:'noodles'},
  {keywords:['chicken rice','rice'],photo:'rice'},
  {keywords:['seafood','fish'],photo:'seafood'},
];
const CUISINE_PHOTO_RULES = [
  {keywords:['vietnamese'],photo:'pho'},
  {keywords:['korean bbq'],photo:'kbbq'},
  {keywords:['korean'],photo:'kbbq'},
  {keywords:['lebanese','shawarma'],photo:'shawarma'},
  {keywords:['mediterranean','middle eastern','afghan','turkish','central asian'],photo:'kabob'},
  {keywords:['american bbq','smokehouse'],photo:'bbq'},
  {keywords:['american diner','diner'],photo:'diner'},
  {keywords:['american','wings'],photo:'wings'},
  {keywords:['pizza'],photo:'pizza'},
  {keywords:['pakistani','indian','desi'],photo:'biryani'},
  {keywords:['chinese','thai','japanese','fusion'],photo:'noodles'},
  {keywords:['mexican'],photo:'tacos'},
  {keywords:['street food'],photo:'rice'},
  {keywords:['seafood'],photo:'seafood'},
];

function getPhotoUrl(cuisine, tags) {
  const allText = [...(tags||[]), cuisine||''].join(' ').toLowerCase();
  for (const r of TAG_PHOTO_RULES) { if (r.keywords.some(k => allText.includes(k))) return PHOTOS[r.photo]; }
  const ct = (cuisine||'').toLowerCase();
  for (const r of CUISINE_PHOTO_RULES) { if (r.keywords.some(k => ct.includes(k))) return PHOTOS[r.photo]; }
  return PHOTOS.default;
}

function Nav({ navigate, menuOpen, setMenuOpen }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [catOpen, setCatOpen] = React.useState(false);
  const [catMobileOpen, setCatMobileOpen] = React.useState(false);
  const catRef = React.useRef(null);
  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', h); return () => window.removeEventListener('resize', h);
  }, []);
  React.useEffect(() => {
    const h = e => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <>
      <nav style={{ position:'sticky', top:0, zIndex:200, background:'rgba(250,250,248,0.97)', backdropFilter:'blur(12px)', borderBottom:`1px solid ${COLORS.border}`, padding:'0 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>
          <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:COLORS.green, display:'flex', alignItems:'center', justifyContent:'center', color:COLORS.gold, fontSize:16 }}>✓</div>
            <span style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:700, color:COLORS.textDark }}>Halal <span style={{ color:COLORS.gold }}>Rated</span></span>
          </button>
          <div style={{ display:isMobile?'none':'flex', alignItems:'center', gap:4 }}>
            <div ref={catRef} style={{ position:'relative' }}>
              <button onClick={() => setCatOpen(o=>!o)} style={{ background:'none', border:'none', cursor:'pointer', padding:'6px 12px', borderRadius:6, fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:catOpen?COLORS.green:COLORS.textMid, display:'flex', alignItems:'center', gap:4 }}>
                Categories <span style={{ fontSize:10, transform:catOpen?'rotate(180deg)':'none', transition:'transform 0.2s', display:'inline-block' }}>▾</span>
              </button>
              {catOpen && (
                <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, background:'white', border:`1px solid ${COLORS.border}`, borderRadius:12, boxShadow:'0 8px 32px rgba(0,0,0,0.10)', minWidth:200, zIndex:200, overflow:'hidden' }}>
                  {categories.map((cat,i) => (
                    <button key={cat.id} onClick={() => { navigate(`/category/${cat.slug}`); setCatOpen(false); }} style={{ display:'block', width:'100%', background:'none', border:'none', borderBottom:i<categories.length-1?`1px solid ${COLORS.border}`:'none', cursor:'pointer', textAlign:'left', padding:'11px 16px', fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:COLORS.textDark, transition:'background 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.background=COLORS.greenLight;e.currentTarget.style.color=COLORS.green;}}
                    onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color=COLORS.textDark;}}
                    >{cat.emoji} {cat.name}</button>
                  ))}
                </div>
              )}
            </div>
            {[{label:'Guides',path:'/guide',external:true},{label:'About',path:'/about'}].map(item => (
              <button key={item.path} onClick={() => item.external?window.location.href=item.path:navigate(item.path)} style={{ background:'none', border:'none', cursor:'pointer', padding:'6px 12px', borderRadius:6, fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:COLORS.textMid }}
              onMouseEnter={e=>e.target.style.color=COLORS.green} onMouseLeave={e=>e.target.style.color=COLORS.textMid}
              >{item.label}</button>
            ))}
            <button onClick={() => navigate('/for-restaurants')} style={{ background:COLORS.green, color:'white', border:'none', borderRadius:8, cursor:'pointer', padding:'8px 16px', marginLeft:8, fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:600 }}>Get Featured</button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display:isMobile?'flex':'none', alignItems:'center', justifyContent:'center', flexDirection:'column', background:menuOpen?COLORS.green:COLORS.greenLight, border:`1px solid ${COLORS.border}`, borderRadius:8, cursor:'pointer', width:40, height:40, gap:5, padding:0, zIndex:201 }}>
            <span style={{ display:'block', width:18, height:2, background:menuOpen?'white':COLORS.green, borderRadius:2, transform:menuOpen?'rotate(45deg) translate(5px, 5px)':'none' }} />
            <span style={{ display:menuOpen?'none':'block', width:18, height:2, background:COLORS.green, borderRadius:2 }} />
            <span style={{ display:'block', width:18, height:2, background:menuOpen?'white':COLORS.green, borderRadius:2, transform:menuOpen?'rotate(-45deg) translate(5px, -5px)':'none' }} />
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'#F7F7F5', zIndex:9999, padding:'0 24px 40px', overflowY:'auto', display:'flex', flexDirection:'column', gap:4 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:64, borderBottom:`1px solid ${COLORS.border}`, marginBottom:8, flexShrink:0 }}>
            <span style={{ fontFamily:"'Playfair Display', serif", fontSize:18, fontWeight:700, color:COLORS.textDark }}>Halal <span style={{ color:COLORS.gold }}>Rated</span></span>
            <button onClick={() => setMenuOpen(false)} style={{ background:COLORS.green, border:'none', borderRadius:8, width:36, height:36, cursor:'pointer', color:'white', fontSize:18, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
          </div>
          {[{label:'Guides',path:'/guide',external:true},{label:'About',path:'/about'},{label:'Contact',path:'/contact'},{label:'For Restaurants',path:'/for-restaurants'}].map(item => (
            <button key={item.path} onClick={() => { item.external?window.location.href=item.path:navigate(item.path); setMenuOpen(false); }} style={{ background:'none', border:'none', cursor:'pointer', padding:'13px 8px', fontFamily:"'DM Sans', sans-serif", fontSize:16, fontWeight:500, color:COLORS.textDark, textAlign:'left', borderBottom:`1px solid ${COLORS.border}` }}>{item.label}</button>
          ))}
          <div style={{ borderBottom:`1px solid ${COLORS.border}` }}>
            <button onClick={() => setCatMobileOpen(o=>!o)} style={{ background:'none', border:'none', cursor:'pointer', padding:'13px 8px', width:'100%', fontFamily:"'DM Sans', sans-serif", fontSize:16, fontWeight:500, color:COLORS.textDark, textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span>Categories</span>
              <span style={{ fontSize:12, transform:catMobileOpen?'rotate(180deg)':'none', transition:'transform 0.2s' }}>▾</span>
            </button>
            {catMobileOpen && (
              <div style={{ paddingBottom:12, display:'flex', flexDirection:'column', gap:2 }}>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => { navigate(`/category/${cat.slug}`); setMenuOpen(false); }} style={{ background:'none', border:'none', cursor:'pointer', padding:'9px 16px', textAlign:'left', fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:COLORS.textMid, display:'flex', alignItems:'center', gap:8, borderRadius:8 }}
                  onMouseEnter={e=>{e.currentTarget.style.background=COLORS.greenLight;e.currentTarget.style.color=COLORS.green;}}
                  onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color=COLORS.textMid;}}
                  ><span>{cat.emoji}</span><span>{cat.name}</span></button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => { navigate('/for-restaurants'); setMenuOpen(false); }} style={{ marginTop:20, background:COLORS.green, color:'white', border:'none', borderRadius:12, cursor:'pointer', padding:'14px 24px', fontFamily:"'DM Sans', sans-serif", fontSize:16, fontWeight:600 }}>Get Featured on Halal Rated</button>
        </div>
      )}
    </>
  );
}

export default function CategoryPage({ slug, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cat = categories.find(c => c.slug === slug);
  const rests = restaurants.filter(r => Array.isArray(r.category) ? r.category.includes(slug) : r.category === slug);

  return (
    <div style={{ background:COLORS.bg, minHeight:'100vh', fontFamily:"'DM Sans', sans-serif" }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @media (max-width:768px) { .cat-grid { grid-template-columns:1fr !important; } }
        @keyframes tickerScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker-track { animation:tickerScroll 32s linear infinite; display:flex; width:max-content; }
        .ticker-track:hover { animation-play-state:paused; }
      `}</style>

      <Nav navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div style={{ background:'#0a2e17', borderBottom:'1px solid rgba(197,150,12,0.3)', overflow:'hidden', height:32, display:'flex', alignItems:'center' }}>
        <div style={{ overflow:'hidden', flex:1 }}>
          <div className="ticker-track">
            {[...Array(2)].map((_,i) => (
              <span key={i} style={{ display:'flex', alignItems:'center' }}>
                {['Every restaurant featured is verified halal — no guesswork, just great food','Subscribe to our weekly newsletter to be the first to know about new spots','Welcome to Halal Rated — we are currently rebranding and adding new restaurants to our directory'].map((text,j) => (
                  <span key={j} style={{ fontFamily:"'DM Sans', sans-serif", fontSize:12, fontWeight:500, color:'rgba(255,255,255,0.75)', whiteSpace:'nowrap', padding:'0 28px' }}>
                    {text} <span style={{ color:'#C5960C', marginLeft:14 }}>·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background:`linear-gradient(135deg, ${COLORS.greenDark}, ${COLORS.green})`, padding:'48px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.7)', fontFamily:"'DM Sans', sans-serif", fontSize:13, marginBottom:16, padding:0 }}>← Back to all restaurants</button>
          <div style={{ fontSize:44, marginBottom:10 }}>{cat?.emoji||'🍽️'}</div>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:36, fontWeight:700, color:'white', marginBottom:8 }}>{cat?.name||slug}</h1>
          <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:15, color:'rgba(255,255,255,0.75)' }}>
            {cat?.description} · <strong style={{ color:'white' }}>{rests.length}</strong> {rests.length===1?'restaurant':'restaurants'} featured
          </p>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'36px 24px' }}>
        {rests.length===0 ? (
          <div style={{ textAlign:'center', padding:'60px 0', color:COLORS.textLight }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🍽️</div>
            <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:16 }}>More restaurants coming soon!</p>
          </div>
        ) : (
          <div className="cat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
            {rests.map(r => {
              const catIds = Array.isArray(r.category)?r.category:[r.category];
              return (
                <div key={r.id} onClick={() => navigate(`/restaurant/${r.slug}`)}
                  style={{ background:COLORS.cardWhite, border:`1px solid ${COLORS.border}`, borderRadius:16, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(15,77,42,0.12)';}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}
                >
                  <div style={{ height:170, background:`linear-gradient(135deg,${COLORS.greenDark},${COLORS.green})`, position:'relative', overflow:'hidden' }}>
                    <img src={r.photo||getPhotoUrl(r.cuisine,r.tags)} alt={r.name} loading="lazy"
                      onError={e=>{e.target.style.display='none';}}
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                    {r.spotlight && <div style={{ position:'absolute', top:10, right:10, background:COLORS.gold, color:'white', borderRadius:20, padding:'2px 9px', fontFamily:"'DM Sans', sans-serif", fontSize:10, fontWeight:700 }}>FEATURED</div>}
                    <div style={{ position:'absolute', bottom:10, left:10, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(6px)', borderRadius:20, padding:'3px 10px', fontFamily:"'DM Sans', sans-serif", fontSize:11, fontWeight:500, color:'white' }}>{r.city}, {r.state}</div>
                  </div>
                  <div style={{ padding:'14px 16px 16px' }}>
                    <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:6 }}>
                      {catIds.map(cid => { const c=categories.find(x=>x.id===cid); return <span key={cid} style={{ background:COLORS.greenLight, color:COLORS.green, borderRadius:20, padding:'2px 8px', fontFamily:"'DM Sans', sans-serif", fontSize:11, fontWeight:600 }}>{c?.name||cid}</span>; })}
                    </div>
                    <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:17, fontWeight:700, color:COLORS.textDark, marginBottom:5 }}>{r.name}</h3>
                    <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:13, color:COLORS.textMid, lineHeight:1.5, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', marginBottom:10 }}>{r.description}</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                      {r.tags.slice(0,3).map(tag => <span key={tag} style={{ background:'#f5f5f3', color:COLORS.textLight, borderRadius:4, padding:'2px 7px', fontFamily:"'DM Sans', sans-serif", fontSize:11 }}>{tag}</span>)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
