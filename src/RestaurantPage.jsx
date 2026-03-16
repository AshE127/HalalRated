import React, { useState } from 'react';
import { restaurants, categories } from './data.js';
import Layout from './Layout.jsx';

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

const PHOTOS = {
  burger:     'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?w=1200&h=400&fit=crop',
  bbq:        'https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?w=1200&h=400&fit=crop',
  wings:      'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?w=1200&h=400&fit=crop',
  kbbq:       'https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?w=1200&h=400&fit=crop',
  biryani:    'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?w=1200&h=400&fit=crop',
  kabob:      'https://images.pexels.com/photos/6210876/pexels-photo-6210876.jpeg?w=1200&h=400&fit=crop',
  shawarma:   'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?w=1200&h=400&fit=crop',
  pizza:      'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?w=1200&h=400&fit=crop',
  noodles:    'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?w=1200&h=400&fit=crop',
  pho:        'https://images.pexels.com/photos/3582379/pexels-photo-3582379.jpeg?w=1200&h=400&fit=crop',
  tacos:      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=1200&h=400&fit=crop',
  rice:       'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?w=1200&h=400&fit=crop',
  diner:      'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?w=1200&h=400&fit=crop',
  seafood:    'https://images.pexels.com/photos/1268549/pexels-photo-1268549.jpeg?w=1200&h=400&fit=crop',
  default:    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?w=1200&h=400&fit=crop',
};

const TAG_PHOTO_RULES = [
  { keywords: ['pho', 'vietnamese'],              photo: 'pho' },
  { keywords: ['kbbq', 'korean bbq', 'korean'],   photo: 'kbbq' },
  { keywords: ['shawarma', 'wrap'],               photo: 'shawarma' },
  { keywords: ['kabob', 'kabab', 'kebab'],        photo: 'kabob' },
  { keywords: ['wings'],                          photo: 'wings' },
  { keywords: ['diner', 'breakfast'],             photo: 'diner' },
  { keywords: ['burger', 'burgers', 'smash'],     photo: 'burger' },
  { keywords: ['bbq', 'smokehouse', 'ribs'],      photo: 'bbq' },
  { keywords: ['pizza'],                          photo: 'pizza' },
  { keywords: ['biryani', 'karahi', 'nihari'],    photo: 'biryani' },
  { keywords: ['taco', 'tacos', 'mexican'],       photo: 'tacos' },
  { keywords: ['noodle', 'ramen', 'chinese', 'thai', 'stir fry'], photo: 'noodles' },
  { keywords: ['chicken rice', 'rice'],           photo: 'rice' },
  { keywords: ['seafood', 'fish'],                photo: 'seafood' },
];

const CUISINE_PHOTO_RULES = [
  { keywords: ['vietnamese'],                     photo: 'pho' },
  { keywords: ['korean bbq'],                     photo: 'kbbq' },
  { keywords: ['korean'],                         photo: 'kbbq' },
  { keywords: ['lebanese', 'shawarma'],           photo: 'shawarma' },
  { keywords: ['mediterranean', 'middle eastern', 'afghan', 'turkish', 'central asian'], photo: 'kabob' },
  { keywords: ['american bbq', 'smokehouse'],     photo: 'bbq' },
  { keywords: ['american diner', 'diner'],        photo: 'diner' },
  { keywords: ['american', 'wings'],              photo: 'wings' },
  { keywords: ['pizza'],                          photo: 'pizza' },
  { keywords: ['pakistani', 'indian', 'desi'],    photo: 'biryani' },
  { keywords: ['chinese', 'thai', 'japanese', 'fusion'], photo: 'noodles' },
  { keywords: ['mexican'],                        photo: 'tacos' },
  { keywords: ['street food'],                    photo: 'rice' },
  { keywords: ['seafood'],                        photo: 'seafood' },
];

function getPhotoUrl(cuisine, tags) {
  const allText = [...(tags || []), cuisine || ''].join(' ').toLowerCase();
  for (const rule of TAG_PHOTO_RULES) {
    if (rule.keywords.some(k => allText.includes(k))) return PHOTOS[rule.photo];
  }
  const cuisineText = (cuisine || '').toLowerCase();
  for (const rule of CUISINE_PHOTO_RULES) {
    if (rule.keywords.some(k => cuisineText.includes(k))) return PHOTOS[rule.photo];
  }
  return PHOTOS.default;
}

const BEEHIIV_PUB_ID = '516d8310-4df5-407e-9681-a142b4b46732';
const BEEHIIV_API_KEY = 'beCQZDFSlrKPLAyrLELFLZsarDKOOGtaMj8xcaeCi0JSMSIHv1DUxTQ4N3uDt20r';

async function subscribeToBeehiiv(email) {
  const res = await fetch(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
    },
    body: JSON.stringify({ email, reactivate_existing: true, send_welcome_email: true }),
  });
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

export default function RestaurantPage({ slug, navigate }) {
  const restaurant = restaurants.find(r => r.slug === slug);
  const [emailInput, setEmailInput] = useState('');
  const [subStatus, setSubStatus] = useState('idle');

  // Inject SEO meta tags
  React.useEffect(() => {
    if (!restaurant) return;
    const title = restaurant.seoTitle || `${restaurant.name} – Halal Rated`;
    const desc = restaurant.seoDescription || restaurant.description;
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = desc;
  }, [restaurant]);

  if (!restaurant) {
    return (
      <div style={{ background: COLORS.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', fontFamily: "'DM Sans', sans-serif" }}>
          <h2 style={{ color: COLORS.textDark, marginBottom: 8 }}>Restaurant not found</h2>
          <button onClick={() => navigate('/')} style={{
            background: COLORS.green, color: 'white', border: 'none',
            borderRadius: 8, cursor: 'pointer', padding: '10px 20px',
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
          }}>← Back to Home</button>
        </div>
      </div>
    );
  }

  const catIds = Array.isArray(restaurant.category) ? restaurant.category : [restaurant.category];
  const cat = categories.find(c => c.id === catIds[0]);
  const related = restaurants.filter(r => {
    const rCats = Array.isArray(r.category) ? r.category : [r.category];
    return rCats.some(c => catIds.includes(c)) && r.id !== restaurant.id;
  }).slice(0, 3);

  return (
    <Layout navigate={navigate}>
      <style>{`
        @media (max-width: 768px) {
          .page-layout { flex-direction: column !important; }
          .sidebar { width: 100% !important; }
          .hero-section { padding: 32px 20px !important; }
        }
      `}</style>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.greenDark}, ${COLORS.green})`,
        padding: '48px 24px',
        position: 'relative', overflow: 'hidden',
      }} className="hero-section">
        <img
          src={restaurant.photo || getPhotoUrl(restaurant.cuisine, restaurant.tags)}
          alt={restaurant.name}
          onError={e => { e.target.style.display = 'none'; }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.25, display: 'block',
          }}
        />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            {catIds.map(cid => {
              const c = categories.find(x => x.id === cid);
              if (!c) return null;
              return (
                <span key={cid} style={{
                  background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
                  color: 'white', borderRadius: 20, padding: '3px 12px',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
                }}>{c.emoji} {c.name}</span>
              );
            })}
            <span style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)', borderRadius: 20, padding: '3px 12px',
              fontFamily: "'DM Sans', sans-serif", fontSize: 12,
            }}>📍 {restaurant.city}, {restaurant.state}</span>
            <span style={{
              background: COLORS.gold, color: 'white',
              borderRadius: 20, padding: '3px 12px',
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
            }}>✓ Halal Verified</span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 40, fontWeight: 700, color: 'white',
            marginBottom: 12, letterSpacing: '-0.5px', lineHeight: 1.2,
          }}>{restaurant.name}</h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6,
            maxWidth: 600,
          }}>{restaurant.description}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        <div className="page-layout" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          {/* Main */}
          <div style={{ flex: 1 }}>
            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
              {restaurant.tags.map(tag => (
                <span key={tag} style={{
                  background: COLORS.greenLight, color: COLORS.green,
                  borderRadius: 20, padding: '5px 12px',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                }}>{tag}</span>
              ))}
            </div>

            {/* Instagram / TikTok follow box */}
            <div style={{
              background: COLORS.cardWhite, border: `1px solid ${COLORS.border}`,
              borderRadius: 16, padding: '24px', marginBottom: 32, textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📱</div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, color: COLORS.textMid, marginBottom: 12,
              }}>Reel coming soon — follow us for the full feature.</p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://instagram.com/halalrated" target="_blank" rel="noreferrer" style={{
                  display: 'inline-block', background: COLORS.green, color: 'white',
                  borderRadius: 8, padding: '8px 16px', textDecoration: 'none',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                }}>📸 Instagram</a>
                <a href="https://tiktok.com/@halalrated" target="_blank" rel="noreferrer" style={{
                  display: 'inline-block', background: '#111', color: 'white',
                  borderRadius: 8, padding: '8px 16px', textDecoration: 'none',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                }}>🎵 TikTok</a>
              </div>
            </div>

            {/* The Spotlight */}
            <div style={{ marginBottom: 32 }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontWeight: 700, color: COLORS.textDark,
                marginBottom: 16,
              }}>The Spotlight</h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, color: COLORS.textMid, lineHeight: 1.8,
              }}>{restaurant.description}</p>
              <br />
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, color: COLORS.textMid, lineHeight: 1.8,
                fontStyle: 'italic',
              }}>
                Full write-up and Reel coming soon. Get notified when we post — follow @halalrated on Instagram.
              </p>
            </div>

            {/* IS IT HALAL section — SEO gold */}
            <div style={{
              background: COLORS.greenLight,
              border: `1px solid rgba(27,115,64,0.2)`,
              borderRadius: 16, padding: '24px', marginBottom: 32,
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20, fontWeight: 700, color: COLORS.textDark,
                marginBottom: 12,
              }}>Is {restaurant.name} Halal?</h2>
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: COLORS.green,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 16, flexShrink: 0,
                }}>✓</div>
                <div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15, fontWeight: 600, color: COLORS.green,
                    marginBottom: 4,
                  }}>Yes — {restaurant.name} is halal.</p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14, color: COLORS.textMid, lineHeight: 1.6,
                  }}>{restaurant.halalNote}</p>
                </div>
              </div>
            </div>

            {/* Cuisine & Category */}
            <div style={{
              background: COLORS.cardWhite, border: `1px solid ${COLORS.border}`,
              borderRadius: 16, padding: '20px', marginBottom: 32,
              display: 'flex', gap: 24, flexWrap: 'wrap',
            }}>
              {[
                { label: 'Cuisine', value: restaurant.cuisine },
                { label: 'Category', value: catIds.map(cid => categories.find(x => x.id === cid)?.name).filter(Boolean).join(', ') },
                { label: 'City', value: `${restaurant.city}, ${restaurant.state}` },
              ].map(item => (
                <div key={item.label}>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11, fontWeight: 700, color: COLORS.textLight,
                    letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 4,
                  }}>{item.label}</div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14, fontWeight: 500, color: COLORS.textDark,
                  }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar" style={{ width: 280, flexShrink: 0 }}>
            <div style={{
              background: COLORS.cardWhite, border: `1px solid ${COLORS.border}`,
              borderRadius: 16, padding: '20px', marginBottom: 20,
            }}>
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 700, color: COLORS.textDark,
                marginBottom: 16,
              }}>Quick Info</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>📍</span>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textLight }}>Location</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textDark }}>{restaurant.city}, VA</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>🍽️</span>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textLight }}>Cuisine</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textDark }}>{restaurant.cuisine}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>✅</span>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textLight }}>Halal Status</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.green, fontWeight: 600 }}>Verified Halal</div>
                  </div>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(restaurant.name + ' ' + restaurant.city + ' VA')}`}
                target="_blank" rel="noreferrer"
                style={{
                  display: 'block', marginTop: 16,
                  background: COLORS.green, color: 'white',
                  borderRadius: 8, padding: '10px', textAlign: 'center',
                  textDecoration: 'none',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                }}>View on Google Maps →</a>
            </div>

            {/* Newsletter */}
            <div style={{
              background: COLORS.goldLight, border: `1px solid rgba(197,150,12,0.2)`,
              borderRadius: 16, padding: '20px',
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📬</div>
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 700, color: COLORS.textDark, marginBottom: 6,
              }}>Stay in the loop</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, color: COLORS.textMid, marginBottom: 12, lineHeight: 1.5,
              }}>Get new restaurant features sent to your inbox.</p>
              <form onSubmit={async e => {
                e.preventDefault();
                if (!emailInput) return;
                setSubStatus('loading');
                try {
                  await subscribeToBeehiiv(emailInput);
                  setSubStatus('success');
                  setEmailInput('');
                } catch {
                  setSubStatus('error');
                }
              }} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {subStatus === 'success' ? (
                  <div style={{
                    background: COLORS.greenLight, borderRadius: 8, padding: '10px 12px',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                    color: COLORS.green, fontWeight: 600, textAlign: 'center',
                  }}>You're in! Check your inbox.</div>
                ) : (
                  <>
                    <input
                      value={emailInput} onChange={e => setEmailInput(e.target.value)}
                      type="email" placeholder="your@email.com" required
                      style={{
                        padding: '9px 12px', borderRadius: 8,
                        border: `1px solid ${subStatus === 'error' ? '#c0392b' : 'rgba(197,150,12,0.3)'}`,
                        fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: 'none',
                        background: 'white',
                      }}
                    />
                    <button type="submit" disabled={subStatus === 'loading'} style={{
                      background: COLORS.gold, color: 'white', border: 'none',
                      borderRadius: 8, cursor: 'pointer', padding: '9px',
                      fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                      opacity: subStatus === 'loading' ? 0.7 : 1,
                    }}>{subStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}</button>
                    {subStatus === 'error' && (
                      <div style={{ fontSize: 11, color: '#c0392b', fontFamily: "'DM Sans', sans-serif" }}>
                        Something went wrong — try again.
                      </div>
                    )}
                  </>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Related restaurants */}
        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 700, color: COLORS.textDark, marginBottom: 20,
            }}>More {cat?.name}</h2>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16,
            }}>
              {related.map(r => (
                <div key={r.id} onClick={() => navigate(`/restaurant/${r.slug}`)}
                  style={{
                    background: COLORS.cardWhite, border: `1px solid ${COLORS.border}`,
                    borderRadius: 12, padding: '16px', cursor: 'pointer',
                    transition: 'box-shadow 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 16, fontWeight: 600, color: COLORS.textDark, marginBottom: 4,
                  }}>{r.name}</div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12, color: COLORS.textLight,
                  }}>📍 {r.city} · {r.cuisine}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
