import React, { useState } from 'react';
import { categories } from './data.js';
import { caterers } from './caterers.js';

const COLORS = {
  green: '#0f4d2a', greenLight: '#e6f0eb', greenDark: '#0a3520',
  gold: '#C5960C', bg: '#F7F7F5', cardWhite: '#FFFFFF',
  textDark: '#111111', textMid: '#4a4a4a', textLight: '#777777', border: '#E2E2DF',
};

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
            <button onClick={() => navigate('/caterers')} style={{ background:'none', border:'none', cursor:'pointer', padding:'6px 12px', borderRadius:6, fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:COLORS.green }}>Caterers</button>
            {[{label:'Guides',path:'/guide',external:true},{label:'About',path:'/about'}].map(item => (
              <button key={item.path} onClick={() => item.external?window.location.href=item.path:navigate(item.path)} style={{ background:'none', border:'none', cursor:'pointer', padding:'6px 12px', borderRadius:6, fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:COLORS.textMid }}
              onMouseEnter={e=>e.target.style.color=COLORS.green} onMouseLeave={e=>e.target.style.color=COLORS.textMid}>{item.label}</button>
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
          {[{label:'Caterers',path:'/caterers'},{label:'Guides',path:'/guide',external:true},{label:'About',path:'/about'},{label:'Contact',path:'/contact'},{label:'For Restaurants',path:'/for-restaurants'}].map(item => (
            <button key={item.path} onClick={() => { item.external?window.location.href=item.path:navigate(item.path); setMenuOpen(false); }} style={{ background:'none', border:'none', cursor:'pointer', padding:'13px 8px', fontFamily:"'DM Sans', sans-serif", fontSize:16, fontWeight:500, color:item.path==='/caterers'?COLORS.green:COLORS.textDark, textAlign:'left', borderBottom:`1px solid ${COLORS.border}` }}>{item.label}</button>
          ))}
          <div style={{ borderBottom:`1px solid ${COLORS.border}` }}>
            <button onClick={() => setCatMobileOpen(o=>!o)} style={{ background:'none', border:'none', cursor:'pointer', padding:'13px 8px', width:'100%', fontFamily:"'DM Sans', sans-serif", fontSize:16, fontWeight:500, color:COLORS.textDark, textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span>Categories</span><span style={{ fontSize:12, transform:catMobileOpen?'rotate(180deg)':'none', transition:'transform 0.2s' }}>▾</span>
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

function Ticker() {
  return (
    <div style={{ background:'#0a2e17', borderBottom:'1px solid rgba(197,150,12,0.3)', overflow:'hidden', height:32, display:'flex', alignItems:'center' }}>
      <style>{`@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.ticker-track{animation:tickerScroll 32s linear infinite;display:flex;width:max-content;}.ticker-track:hover{animation-play-state:paused;}`}</style>
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
  );
}

export default function CaterersPage({ navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ background:COLORS.bg, minHeight:'100vh', fontFamily:"'DM Sans', sans-serif" }}>
      <style>{`* { box-sizing:border-box; margin:0; padding:0; } @media(max-width:768px){.cat-grid{grid-template-columns:1fr !important;}}`}</style>

      <Nav navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Ticker />

      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg, ${COLORS.greenDark}, ${COLORS.green})`, padding:'56px 24px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:11, fontWeight:700, color:COLORS.gold, letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:12 }}>Halal Catering · DMV Area</div>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,5vw,42px)', fontWeight:700, color:'white', marginBottom:12, letterSpacing:'-0.5px', lineHeight:1.2 }}>Halal Caterers in Northern Virginia</h1>
          <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:16, color:'rgba(255,255,255,0.75)', maxWidth:560, lineHeight:1.6 }}>
            Home cooks and professional caterers serving halal food for weddings, Eid gatherings, family events, and everything in between.
          </p>
        </div>
      </div>

      {/* Caterer cards */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'40px 24px' }}>
        <div style={{ marginBottom:24 }}>
          <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:13, color:COLORS.textLight }}>{caterers.length} caterer{caterers.length !== 1 ? 's' : ''} featured</p>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {caterers.map(c => (
            <div key={c.id} style={{ background:COLORS.cardWhite, border:`1px solid ${COLORS.border}`, borderRadius:16, overflow:'hidden' }}>
              {/* Card header */}
              <div style={{ background:`linear-gradient(120deg, ${COLORS.greenDark}, ${COLORS.green})`, padding:'24px 28px', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8, flexWrap:'wrap' }}>
                    <span style={{ background:'rgba(255,255,255,0.15)', borderRadius:20, padding:'2px 10px', fontFamily:"'DM Sans', sans-serif", fontSize:11, fontWeight:700, color:'white', letterSpacing:'0.5px' }}>{c.type}</span>
                    {c.halal && <span style={{ background:COLORS.gold, borderRadius:20, padding:'2px 10px', fontFamily:"'DM Sans', sans-serif", fontSize:11, fontWeight:700, color:'white' }}>Halal Certified</span>}
                  </div>
                  <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:26, fontWeight:700, color:'white', marginBottom:4 }}>{c.name}</h2>
                  <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:13, color:'rgba(255,255,255,0.7)' }}>{c.city}, {c.state} · {c.cuisine}</p>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end' }}>
                  {c.website && (
                    <a href={c.website} target="_blank" rel="noopener noreferrer" style={{ background:'white', color:COLORS.green, borderRadius:8, padding:'8px 18px', fontFamily:"'DM Sans', sans-serif", fontSize:13, fontWeight:700, textDecoration:'none', whiteSpace:'nowrap' }}>Visit Website →</a>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding:'24px 28px' }}>
                <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:14, color:COLORS.textMid, lineHeight:1.7, marginBottom:20 }}>{c.description}</p>

                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:20, marginBottom:20 }}>
                  {/* Specialties */}
                  <div>
                    <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:11, fontWeight:700, color:COLORS.textDark, letterSpacing:'0.8px', textTransform:'uppercase', marginBottom:8 }}>Specialties</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                      {c.specialties.map(s => <span key={s} style={{ background:COLORS.greenLight, color:COLORS.green, borderRadius:20, padding:'3px 10px', fontFamily:"'DM Sans', sans-serif", fontSize:12, fontWeight:500 }}>{s}</span>)}
                    </div>
                  </div>
                  {/* Events */}
                  <div>
                    <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:11, fontWeight:700, color:COLORS.textDark, letterSpacing:'0.8px', textTransform:'uppercase', marginBottom:8 }}>Events</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                      {c.events.map(e => <span key={e} style={{ background:'#f5f5f3', color:COLORS.textMid, borderRadius:20, padding:'3px 10px', fontFamily:"'DM Sans', sans-serif", fontSize:12, fontWeight:500 }}>{e}</span>)}
                    </div>
                  </div>
                </div>

                {/* Contact row */}
                <div style={{ borderTop:`1px solid ${COLORS.border}`, paddingTop:16, display:'flex', flexWrap:'wrap', gap:10, alignItems:'center' }}>
                  <span style={{ fontFamily:"'DM Sans', sans-serif", fontSize:12, fontWeight:700, color:COLORS.textDark, textTransform:'uppercase', letterSpacing:'0.5px', marginRight:4 }}>Get in Touch:</span>
                  {c.phone && <a href={`tel:${c.phone}`} style={{ display:'inline-flex', alignItems:'center', gap:5, background:COLORS.greenLight, color:COLORS.green, borderRadius:8, padding:'6px 14px', fontFamily:"'DM Sans', sans-serif", fontSize:13, fontWeight:600, textDecoration:'none' }}>📞 Call</a>}
                  {c.email && <a href={`mailto:${c.email}`} style={{ display:'inline-flex', alignItems:'center', gap:5, background:COLORS.greenLight, color:COLORS.green, borderRadius:8, padding:'6px 14px', fontFamily:"'DM Sans', sans-serif", fontSize:13, fontWeight:600, textDecoration:'none' }}>✉️ Email</a>}
                  {c.website && <a href={c.website} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:5, background:COLORS.greenLight, color:COLORS.green, borderRadius:8, padding:'6px 14px', fontFamily:"'DM Sans', sans-serif", fontSize:13, fontWeight:600, textDecoration:'none' }}>🌐 Website</a>}
                  {c.instagram && <a href={c.instagram} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:5, background:COLORS.greenLight, color:COLORS.green, borderRadius:8, padding:'6px 14px', fontFamily:"'DM Sans', sans-serif", fontSize:13, fontWeight:600, textDecoration:'none' }}>📸 Instagram</a>}
                  {c.facebook && <a href={c.facebook} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:5, background:COLORS.greenLight, color:COLORS.green, borderRadius:8, padding:'6px 14px', fontFamily:"'DM Sans', sans-serif", fontSize:13, fontWeight:600, textDecoration:'none' }}>👥 Facebook</a>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Are you a caterer CTA */}
        <div style={{ marginTop:48, background:`linear-gradient(135deg, ${COLORS.greenDark}, ${COLORS.green})`, borderRadius:16, padding:'36px 32px', textAlign:'center' }}>
          <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:24, fontWeight:700, color:'white', marginBottom:10 }}>Are you a halal caterer in NOVA?</h3>
          <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:14, color:'rgba(255,255,255,0.75)', marginBottom:20, maxWidth:440, margin:'0 auto 20px' }}>Get featured on Halal Rated and reach thousands of families looking for halal catering across Northern Virginia.</p>
          <button onClick={() => navigate('/for-restaurants')} style={{ background:COLORS.gold, color:'white', border:'none', borderRadius:10, cursor:'pointer', padding:'12px 24px', fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:700 }}>Get Your Business Featured →</button>
        </div>
      </div>
    </div>
  );
}
