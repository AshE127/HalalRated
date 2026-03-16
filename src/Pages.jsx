import React from 'react';
import { restaurants, categories } from './data.js';

const COLORS = {
  green: '#0f4d2a', greenLight: '#e6f0eb', greenDark: '#0a3520',
  gold: '#C5960C', goldLight: '#fdf6e3',
  bg: '#F7F7F5', cardWhite: '#FFFFFF',
  textDark: '#111111', textMid: '#4a4a4a', textLight: '#777777',
  border: '#E2E2DF',
};

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

function FullNav({ navigate }) {
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
                    <button key={cat.id} onClick={() => { navigate(`/category/${cat.slug}`); setCatOpen(false); }} style={{ display:'block', width:'100%', background:'none', border:'none', borderBottom:i<categories.length-1?`1px solid ${COLORS.border}`:'none', cursor:'pointer', textAlign:'left', padding:'11px 16px', fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:COLORS.textDark }}
                    onMouseEnter={e=>{e.currentTarget.style.background=COLORS.greenLight;e.currentTarget.style.color=COLORS.green;}}
                    onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color=COLORS.textDark;}}
                    >{cat.emoji} {cat.name}</button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => navigate('/caterers')} style={{ background:'none', border:'none', cursor:'pointer', padding:'6px 12px', borderRadius:6, fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:COLORS.textMid }} onMouseEnter={e=>e.target.style.color=COLORS.green} onMouseLeave={e=>e.target.style.color=COLORS.textMid}>Caterers</button>
            <button onClick={() => navigate('/about')} style={{ background:'none', border:'none', cursor:'pointer', padding:'6px 12px', borderRadius:6, fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:COLORS.textMid }} onMouseEnter={e=>e.target.style.color=COLORS.green} onMouseLeave={e=>e.target.style.color=COLORS.textMid}>About</button>
            <button onClick={() => navigate('/for-restaurants')} style={{ background:COLORS.green, color:'white', border:'none', borderRadius:8, cursor:'pointer', padding:'8px 16px', marginLeft:8, fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:600 }}>Get Featured</button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display:isMobile?'flex':'none', alignItems:'center', justifyContent:'center', flexDirection:'column', background:menuOpen?COLORS.green:COLORS.greenLight, border:`1px solid ${COLORS.border}`, borderRadius:8, cursor:'pointer', width:40, height:40, gap:5, padding:0 }}>
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
          {[{label:'Caterers',path:'/caterers'},{label:'About',path:'/about'},{label:'Contact',path:'/contact'},{label:'For Restaurants',path:'/for-restaurants'}].map(item => (
            <button key={item.path} onClick={() => { navigate(item.path); setMenuOpen(false); }} style={{ background:'none', border:'none', cursor:'pointer', padding:'13px 8px', fontFamily:"'DM Sans', sans-serif", fontSize:16, fontWeight:500, color:item.path==='/caterers'?COLORS.green:COLORS.textDark, textAlign:'left', borderBottom:`1px solid ${COLORS.border}` }}>{item.label}</button>
          ))}
          <div style={{ borderBottom:`1px solid ${COLORS.border}` }}>
            <button onClick={() => setCatMobileOpen(o=>!o)} style={{ background:'none', border:'none', cursor:'pointer', padding:'13px 8px', width:'100%', fontFamily:"'DM Sans', sans-serif", fontSize:16, fontWeight:500, color:COLORS.textDark, textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span>Categories</span><span style={{ fontSize:12, transform:catMobileOpen?'rotate(180deg)':'none', transition:'transform 0.2s' }}>▾</span>
            </button>
            {catMobileOpen && (
              <div style={{ paddingBottom:12, display:'flex', flexDirection:'column', gap:2 }}>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => { navigate(`/category/${cat.slug}`); setMenuOpen(false); }} style={{ background:'none', border:'none', cursor:'pointer', padding:'9px 16px', textAlign:'left', fontFamily:"'DM Sans', sans-serif", fontSize:14, fontWeight:500, color:COLORS.textMid }}
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

export function CityPage({ slug, navigate }) {
  const cityName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const rests = restaurants.filter(r => r.city.toLowerCase().includes(slug.toLowerCase()));

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <FullNav navigate={navigate} />
      <Ticker />
      <div style={{ background: `linear-gradient(135deg, ${COLORS.greenDark}, ${COLORS.green})`, padding: '56px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: 'white', marginBottom: 8 }}>Halal Food in {cityName}, VA</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>{rests.length} featured restaurants · Halal Rated NOVA</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        {rests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: COLORS.textLight }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16 }}>No restaurants featured in {cityName} yet — check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {rests.map(r => {
              const cat = categories.find(c => c.id === r.category);
              return (
                <div key={r.id} onClick={() => navigate(`/restaurant/${r.slug}`)}
                  style={{ background: COLORS.cardWhite, border: `1px solid ${COLORS.border}`, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ height: 140, background: `linear-gradient(135deg, ${COLORS.greenDark}, ${COLORS.green})` }}/>
                  <div style={{ padding: '14px 16px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: COLORS.textDark, marginBottom: 4 }}>{r.name}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textLight }}>{cat?.name} · {r.cuisine}</p>
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

export function AboutPage({ navigate }) {
  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <FullNav navigate={navigate} />
      <Ticker />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ marginBottom: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.gold, letterSpacing: '1px', textTransform: 'uppercase' }}>About</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: COLORS.textDark, marginBottom: 24, letterSpacing: '-0.5px' }}>Putting NOVA's halal food on the map.</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.textMid, lineHeight: 1.8, marginBottom: 20 }}>
          Halal Rated is Northern Virginia's halal food media brand. We spotlight the best halal restaurants across NOVA — from Herndon to Ashburn, Sterling to Falls Church.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.textMid, lineHeight: 1.8, marginBottom: 20 }}>
          We're not a ranking site and we're not a review blog. Think of us as a food media publication — if a restaurant doesn't impress, it doesn't get posted. Every feature on Halal Rated is a genuine spotlight.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.textMid, lineHeight: 1.8, marginBottom: 40 }}>
          Our mission is simple: help NOVA's Muslim community find great halal food, and give great halal restaurants the exposure they deserve.
        </p>

        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: COLORS.textDark, marginBottom: 16 }}>What We Cover</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 40 }}>
          {[
            { emoji: '', title: 'Hidden Halal', desc: 'Mainstream spots you didn\'t know were halal' },
            { emoji: '', title: 'Delicious Desi', desc: 'Pakistani, Indian & South Asian favorites' },
            { emoji: '', title: 'Mezze Musts', desc: 'Mediterranean, Arab, Turkish & Afghan' },
            { emoji: '', title: 'Soy Selects', desc: 'Halal Asian — Chinese, Korean, Vietnamese' },
          ].map(c => (
            <div key={c.title} style={{ background: COLORS.cardWhite, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '16px' }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.textDark, marginBottom: 4 }}>{c.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textLight }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: COLORS.greenLight, border: `1px solid rgba(27,115,64,0.2)`, borderRadius: 16, padding: '24px' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.textDark, marginBottom: 12 }}>Get in Touch</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textMid, marginBottom: 12, lineHeight: 1.6 }}>For restaurant features, partnerships, or press inquiries:</p>
          <a href="mailto:hello@halalrated.com" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.green, textDecoration: 'none' }}>hello@halalrated.com</a>
          <br /><br />
          <a href="https://instagram.com/halalrated" target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.green, textDecoration: 'none' }}>@halalrated on Instagram →</a>
          <br /><br />
          <a href="https://tiktok.com/@halalrated" target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.green, textDecoration: 'none' }}>@halalrated on TikTok →</a>
        </div>
      </div>
    </div>
  );
}

export function ContactPage({ navigate }) {
  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <FullNav navigate={navigate} />
      <Ticker />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '56px 24px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: COLORS.textDark, marginBottom: 8 }}>Contact Us</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.textMid, marginBottom: 40, lineHeight: 1.6 }}>Questions, partnerships, restaurant submissions, or just want to say hi.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '✉️', label: 'Email', value: 'hello@halalrated.com', href: 'mailto:hello@halalrated.com' },
            { emoji: '📸', label: 'Instagram', value: '@halalrated', href: 'https://instagram.com/halalrated' },
            { emoji: '🎵', label: 'TikTok', value: '@halalrated', href: 'https://tiktok.com/@halalrated' },
          ].map(item => (
            <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 16, background: COLORS.cardWhite, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '16px 20px', textDecoration: 'none', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ fontSize: 24, flexShrink: 0 }}>{item.emoji}</div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textLight, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: COLORS.green }}>{item.value}</div>
              </div>
            </a>
          ))}
        </div>
        <button onClick={() => navigate('/for-restaurants')} style={{
          display: 'block', width: '100%', background: COLORS.green, color: 'white',
          border: 'none', borderRadius: 12, cursor: 'pointer', padding: '16px',
          fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
        }}>Want to get your restaurant featured? →</button>
      </div>
    </div>
  );
}

export function ForRestaurantsPage({ navigate }) {
  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <FullNav navigate={navigate} />
      <Ticker />
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.greenDark}, ${COLORS.green})`,
        padding: '64px 24px',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.gold, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>For Restaurants</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: 'white', marginBottom: 16, letterSpacing: '-0.5px' }}>Get Your Restaurant Featured</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
            A permanent, searchable page on NOVA's premier halal food guide — plus an Instagram Reel and exposure to thousands of halal food seekers.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: COLORS.textDark, marginBottom: 24, textAlign: 'center' }}>What You Get</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '', title: 'Permanent Page', desc: 'Your own dedicated page on halalrated.com — searchable and indexed by Google' },
            { icon: '', title: 'Instagram Reel', desc: 'A professional faceless aesthetic Reel posted to @halalrated' },
            { icon: '', title: 'SEO Exposure', desc: '"Is [your restaurant] halal?" searches will lead directly to your page' },
            { icon: '', title: 'NOVA Reach', desc: 'Targeted exposure to Northern Virginia\'s halal food community' },
          ].map(item => (
            <div key={item.title} style={{ background: COLORS.cardWhite, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: '20px' }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.textDark, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textLight, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Restaurant of the Week */}
        <div style={{ background: COLORS.goldLight, border: `1px solid rgba(197,150,12,0.3)`, borderRadius: 20, padding: '32px', marginBottom: 48 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.gold, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Premium Slot</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: COLORS.textDark, marginBottom: 10 }}>Restaurant of the Week</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textMid, lineHeight: 1.7, marginBottom: 16 }}>
            Get the most prominent placement on halalrated.com — a full hero banner at the top of the homepage, visible to every visitor. Rotates weekly. Limited availability.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.gold }}>Contact us for pricing → hello@halalrated.com</p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: COLORS.cardWhite, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: '40px' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: COLORS.textDark, marginBottom: 12 }}>Ready to get featured?</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.textMid, marginBottom: 24, lineHeight: 1.6 }}>
            Reach out and we'll be in touch within 24 hours.
          </p>
          <a href="mailto:hello@halalrated.com?subject=Restaurant Feature Request" style={{
            display: 'inline-block', background: COLORS.green, color: 'white',
            borderRadius: 12, padding: '14px 32px', textDecoration: 'none',
            fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
            marginBottom: 12,
          }}>Email hello@halalrated.com →</a>
          <br />
          <a href="https://instagram.com/halalrated" target="_blank" rel="noreferrer" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textMid,
            textDecoration: 'none', marginRight: 16,
          }}>DM on Instagram @halalrated</a>
          <span style={{ color: COLORS.textLight, fontSize: 13 }}>·</span>
          <a href="https://tiktok.com/@halalrated" target="_blank" rel="noreferrer" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textMid,
            textDecoration: 'none', marginLeft: 16,
          }}>TikTok @halalrated</a>
        </div>
      </div>
    </div>
  );
}




export function PrivacyPage({ navigate }) {
  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <FullNav navigate={navigate} />
      <Ticker />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: COLORS.textDark, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, color: COLORS.textLight, marginBottom: 40 }}>Last updated: March 2026</p>
        {[
          { title: 'Who We Are', body: 'Halal Rated is a halal food media brand based in Northern Virginia. We operate halalrated.com and publish a newsletter spotlighting halal-friendly restaurants across the NOVA region. You can reach us at hello@halalrated.com.' },
          { title: 'What Information We Collect', body: 'The only personal information we collect is your email address, and only when you voluntarily subscribe to our newsletter. We do not collect names, phone numbers, payment information, or any other personal data.' },
          { title: 'How We Use Your Information', body: 'Your email address is used solely to send you our newsletter — new restaurant features, halal food discoveries, and occasional updates about Halal Rated. We will never use your email for any other purpose.' },
          { title: 'Third-Party Services', body: "We use Beehiiv to manage our newsletter and email delivery. Your email address is stored on Beehiiv's platform in accordance with their privacy policy. We use Vercel to host halalrated.com. Basic analytics may be collected by these platforms to help us understand site performance." },
          { title: 'Cookies', body: 'Our website may use standard cookies to ensure basic functionality and improve your browsing experience. We do not use cookies to track you across other websites or for advertising purposes.' },
          { title: 'We Do Not Sell Your Data', body: 'We do not sell, rent, trade, or share your personal information with any third parties for marketing purposes. Ever.' },
          { title: 'Unsubscribing', body: 'You can unsubscribe from our newsletter at any time by clicking the unsubscribe link in any email we send. You can also email us at hello@halalrated.com to be removed.' },
          { title: 'Contact', body: 'If you have any questions about this privacy policy, please contact us at hello@halalrated.com.' },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: 36 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.textDark, marginBottom: 10 }}>{section.title}</h2>
            <p style={{ fontSize: 15, color: COLORS.textMid, lineHeight: 1.8 }}>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
