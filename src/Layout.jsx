import React, { useState } from 'react';
import { categories } from './data.js';

const COLORS = {
  green: '#0f4d2a', greenLight: '#e6f0eb', greenDark: '#0a3520',
  gold: '#C5960C', bg: '#F7F7F5', cardWhite: '#FFFFFF',
  textDark: '#111111', textMid: '#4a4a4a', textLight: '#777777', border: '#E2E2DF',
};

function Ticker() {
  return (
    <div style={{ background:'#0a2e17', borderBottom:'1px solid rgba(197,150,12,0.3)', overflow:'hidden', height:32, display:'flex', alignItems:'center' }}>
      <style>{`@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.ticker-track{animation:tickerScroll 32s linear infinite;display:flex;width:max-content;}.ticker-track:hover{animation-play-state:paused;}`}</style>
      <div style={{ overflow:'hidden', flex:1 }}>
        <div className="ticker-track">
          {[...Array(2)].map((_,i) => (
            <span key={i} style={{ display:'flex', alignItems:'center' }}>
              {[
                'Every restaurant featured is verified halal — no guesswork, just great food',
                'Subscribe to our weekly newsletter to be the first to know about new spots',
                'Welcome to Halal Rated — we are currently rebranding and adding new restaurants to our directory',
              ].map((text,j) => (
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

function Nav({ navigate }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = React.useState(false);
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
          {/* Logo */}
          <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:COLORS.green, display:'flex', alignItems:'center', justifyContent:'center', color:COLORS.gold, fontSize:16, flexShrink:0 }}>✓</div>
            <span style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:700, color:COLORS.textDark }}>Halal <span style={{ color:COLORS.gold }}>Rated</span></span>
          </button>

          {/* Desktop links */}
          <div style={{ display:isMobile?'none':'flex', alignItems:'center', gap:4 }}>
            <div ref={catRef} style={{ position:'relative' }}>
              <button onClick={() => setCatOpen(o=>!o)} style={{ background:'none', border:'none', cursor:'pointer', padding:'6px 12px', borderRadius:6, fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:catOpen?COLORS.green:COLORS.textMid, display:'flex', alignItems:'center', gap:4 }}>
                Categories <span style={{ fontSize:10, transform:catOpen?'rotate(180deg)':'none', transition:'transform 0.2s', display:'inline-block' }}>▾</span>
              </button>
              {catOpen && (
                <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, background:'white', border:`1px solid ${COLORS.border}`, borderRadius:12, boxShadow:'0 8px 32px rgba(0,0,0,0.10)', minWidth:200, zIndex:300, overflow:'hidden' }}>
                  {categories.map((cat,i) => (
                    <button key={cat.id} onClick={() => { navigate(`/category/${cat.slug}`); setCatOpen(false); }}
                      style={{ display:'block', width:'100%', background:'none', border:'none', borderBottom:i<categories.length-1?`1px solid ${COLORS.border}`:'none', cursor:'pointer', textAlign:'left', padding:'11px 16px', fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:COLORS.textDark }}
                      onMouseEnter={e=>{e.currentTarget.style.background=COLORS.greenLight;e.currentTarget.style.color=COLORS.green;}}
                      onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color=COLORS.textDark;}}
                    >{cat.emoji} {cat.name}</button>
                  ))}
                </div>
              )}
            </div>
            {[
              { label:'Caterers', path:'/caterers' },
              { label:'Guides', path:'/guide' },
              { label:'About', path:'/about' },
            ].map(item => (
              <button key={item.path} onClick={() => navigate(item.path)}
                style={{ background:'none', border:'none', cursor:'pointer', padding:'6px 12px', borderRadius:6, fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:COLORS.textMid, transition:'color 0.15s' }}
                onMouseEnter={e=>e.target.style.color=COLORS.green}
                onMouseLeave={e=>e.target.style.color=COLORS.textMid}
              >{item.label}</button>
            ))}
            <button onClick={() => navigate('/for-restaurants')} style={{ background:COLORS.green, color:'white', border:'none', borderRadius:8, cursor:'pointer', padding:'8px 16px', marginLeft:8, fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:600 }}>Get Featured</button>
          </div>

          {/* Mobile hamburger — fixed position so overlay doesn't cover it */}
          <div style={{ display:isMobile?'block':'none', width:40, height:40 }} />
        </div>
      </nav>

      {/* Hamburger floats above everything */}
      {isMobile && (
        <div style={{ position:'fixed', top:12, right:12, zIndex:10001 }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', background:menuOpen?COLORS.green:COLORS.greenLight, border:`1px solid ${COLORS.border}`, borderRadius:8, cursor:'pointer', width:40, height:40, gap:5, padding:0 }}>
            <span style={{ display:'block', width:18, height:2, background:menuOpen?'white':COLORS.green, borderRadius:2, transition:'all 0.2s', transform:menuOpen?'rotate(45deg) translate(5px, 5px)':'none' }} />
            <span style={{ display:menuOpen?'none':'block', width:18, height:2, background:COLORS.green, borderRadius:2 }} />
            <span style={{ display:'block', width:18, height:2, background:menuOpen?'white':COLORS.green, borderRadius:2, transition:'all 0.2s', transform:menuOpen?'rotate(-45deg) translate(5px, -5px)':'none' }} />
          </button>
        </div>
      )}

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'#F7F7F5', zIndex:10000, padding:'0 24px 40px', overflowY:'auto', display:'flex', flexDirection:'column', gap:4 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:64, borderBottom:`1px solid ${COLORS.border}`, marginBottom:8, flexShrink:0 }}>
            <span style={{ fontFamily:"'Playfair Display', serif", fontSize:18, fontWeight:700, color:COLORS.textDark }}>Halal <span style={{ color:COLORS.gold }}>Rated</span></span>
            <button onClick={() => setMenuOpen(false)} style={{ background:COLORS.green, border:'none', borderRadius:8, width:36, height:36, cursor:'pointer', color:'white', fontSize:18, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
          </div>
          {[
            { label:'Home', path:'/' },
            { label:'Caterers', path:'/caterers' },
            { label:'Guides', path:'/guide' },
            { label:'About', path:'/about' },
            { label:'Contact', path:'/contact' },
            { label:'For Restaurants', path:'/for-restaurants' },
          ].map(item => (
            <button key={item.path} onClick={() => { navigate(item.path); setMenuOpen(false); }}
              style={{ background:'none', border:'none', cursor:'pointer', padding:'13px 8px', fontFamily:"'DM Sans', sans-serif", fontSize:16, fontWeight:500, color:item.path==='/caterers'?COLORS.green:COLORS.textDark, textAlign:'left', borderBottom:`1px solid ${COLORS.border}` }}
            >{item.label}</button>
          ))}
          <div style={{ borderBottom:`1px solid ${COLORS.border}` }}>
            <button onClick={() => setCatMobileOpen(o=>!o)} style={{ background:'none', border:'none', cursor:'pointer', padding:'13px 8px', width:'100%', fontFamily:"'DM Sans', sans-serif", fontSize:16, fontWeight:500, color:COLORS.textDark, textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span>Categories</span><span style={{ fontSize:12, transform:catMobileOpen?'rotate(180deg)':'none', transition:'transform 0.2s' }}>▾</span>
            </button>
            {catMobileOpen && (
              <div style={{ paddingBottom:12, display:'flex', flexDirection:'column', gap:2 }}>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => { navigate(`/category/${cat.slug}`); setMenuOpen(false); }}
                    style={{ background:'none', border:'none', cursor:'pointer', padding:'9px 16px', textAlign:'left', fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:COLORS.textMid }}
                    onMouseEnter={e=>{e.currentTarget.style.background=COLORS.greenLight;e.currentTarget.style.color=COLORS.green;}}
                    onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color=COLORS.textMid;}}
                  >{cat.emoji} {cat.name}</button>
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

function Footer({ navigate }) {
  return (
    <footer style={{ padding:'56px 24px 32px', marginTop:56, borderTop:`1px solid ${COLORS.border}` }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32, flexWrap:'wrap', gap:24 }}>
          <div>
            <div style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:700, color:COLORS.textDark, marginBottom:6 }}>
              Halal <span style={{ color:COLORS.gold }}>Rated</span>
            </div>
            <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:13, color:COLORS.textLight, maxWidth:240, lineHeight:1.5 }}>
              Northern Virginia's halal food media brand. Spotlighting the best — positive coverage only.
            </p>
          </div>
          <div style={{ display:'flex', gap:48, flexWrap:'wrap' }}>
            <div>
              <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:12, fontWeight:700, color:COLORS.textDark, marginBottom:12, letterSpacing:'0.5px', textTransform:'uppercase' }}>Discover</div>
              {[
                { label:'Hidden Halal', path:'/category/hidden-halal' },
                { label:'Delicious Desi', path:'/category/delicious-desi' },
                { label:'Mezze Musts', path:'/category/mezze-musts' },
                { label:'Soy Selects', path:'/category/soy-selects' },
                { label:'Top Tier', path:'/category/top-tier' },
                { label:'Caterers', path:'/caterers' },
              ].map(l => (
                <button key={l.path} onClick={() => navigate(l.path)} style={{ display:'block', background:'none', border:'none', cursor:'pointer', padding:'3px 0', fontFamily:"'DM Sans', sans-serif", fontSize:13, color:COLORS.textMid }}
                  onMouseEnter={e=>e.target.style.color=COLORS.green} onMouseLeave={e=>e.target.style.color=COLORS.textMid}
                >{l.label}</button>
              ))}
            </div>
            <div>
              <div style={{ fontFamily:"'DM Sans', sans-serif", fontSize:12, fontWeight:700, color:COLORS.textDark, marginBottom:12, letterSpacing:'0.5px', textTransform:'uppercase' }}>Company</div>
              {[
                { label:'About', path:'/about' },
                { label:'Contact', path:'/contact' },
                { label:'For Restaurants', path:'/for-restaurants' },
                { label:'Guides', path:'/guide' },
                { label:'Instagram', path:'https://instagram.com/halalrated', external:true },
                { label:'TikTok', path:'https://tiktok.com/@halalrated', external:true },
              ].map(l => (
                <button key={l.label} onClick={() => l.external ? window.open(l.path,'_blank') : navigate(l.path)} style={{ display:'block', background:'none', border:'none', cursor:'pointer', padding:'3px 0', fontFamily:"'DM Sans', sans-serif", fontSize:13, color:COLORS.textMid }}
                  onMouseEnter={e=>e.target.style.color=COLORS.green} onMouseLeave={e=>e.target.style.color=COLORS.textMid}
                >{l.label}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${COLORS.border}`, paddingTop:20, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
          <span style={{ fontFamily:"'DM Sans', sans-serif", fontSize:12, color:COLORS.textLight }}>© 2026 Halal Rated. All rights reserved.</span>
          <div style={{ display:'flex', gap:16, alignItems:'center' }}>
            <button onClick={() => navigate('/privacy')} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:"'DM Sans', sans-serif", fontSize:12, color:COLORS.textLight, textDecoration:'underline' }}>Privacy Policy</button>
            <a href="mailto:hello@halalrated.com" style={{ fontFamily:"'DM Sans', sans-serif", fontSize:12, color:COLORS.green, textDecoration:'none' }}>hello@halalrated.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ navigate, children }) {
  return (
    <div style={{ background:COLORS.bg, minHeight:'100vh', fontFamily:"'DM Sans', sans-serif" }}>
      <style>{`* { box-sizing:border-box; margin:0; padding:0; } @media(max-width:768px){ .restaurant-grid{grid-template-columns:1fr!important;} .cat-grid{grid-template-columns:1fr!important;} }`}</style>
      <Nav navigate={navigate} />
      <Ticker />
      {children}
      <Footer navigate={navigate} />
    </div>
  );
}
