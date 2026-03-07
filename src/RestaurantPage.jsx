import React, { useState } from 'react';
import { restaurants, categories } from './data.js';

const COLORS = {
  green: '#0f4d2a', greenLight: '#e6f0eb', greenDark: '#0a3520',
  gold: '#C5960C', goldLight: '#fdf6e3',
  bg: '#F7F7F5', cardWhite: '#FFFFFF',
  textDark: '#111111', textMid: '#4a4a4a', textLight: '#777777',
  border: '#E2E2DF',
};

function SimpleNav({ navigate }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(250, 250, 248, 0.95)', backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${COLORS.border}`,
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', height: 64, gap: 16,
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textMid,
        }}>← Back</button>
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Playfair Display', serif",
          fontSize: 18, fontWeight: 700, color: COLORS.textDark,
        }}>Halal <span style={{ color: COLORS.gold }}>Rated</span></button>
      </div>
    </nav>
  );
}

const CUISINE_PHOTO_MAP = {
  'american bbq': 'bbq burger smash',
  'american diner': 'american diner food',
  'korean bbq': 'korean bbq grill meat',
  'korean': 'korean food',
  'chinese': 'chinese food noodles',
  'pakistani': 'biryani rice curry',
  'afghan': 'kabob rice afghan food',
  'indian': 'curry biryani indian food',
  'lebanese': 'shawarma lebanese food',
  'mediterranean': 'mediterranean food mezze',
  'turkish': 'turkish food kebab',
  'middle eastern': 'middle eastern food hummus',
  'fusion': 'gourmet food plating',
  'central asian': 'mandi rice lamb',
  'pizza': 'pizza italian',
  'italian': 'italian food pasta',
  'mexican': 'tacos mexican food',
  'thai': 'thai food noodles',
  'japanese': 'japanese food ramen',
  'seafood': 'seafood fresh fish',
  'burgers': 'gourmet burger fries',
  'default': 'halal food restaurant',
};

function getPhotoUrl(cuisine, slug) {
  const key = (cuisine || '').toLowerCase();
  const match = Object.keys(CUISINE_PHOTO_MAP).find(k => key.includes(k)) || 'default';
  const query = CUISINE_PHOTO_MAP[match];
  const seed = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return `https://source.unsplash.com/1200x400/?${encodeURIComponent(query)}&sig=${seed}`;
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
    <div style={{ background: COLORS.bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .page-layout { flex-direction: column !important; }
          .sidebar { width: 100% !important; }
          .hero-section { padding: 32px 20px !important; }
        }
      `}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" />

      <SimpleNav navigate={navigate} />

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.greenDark}, ${COLORS.green})`,
        padding: '48px 24px',
        position: 'relative', overflow: 'hidden',
      }} className="hero-section">
        <img
          src={restaurant.photo || getPhotoUrl(restaurant.cuisine, restaurant.slug)}
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

            {/* Instagram Reel placeholder */}
            <div style={{
              background: COLORS.cardWhite, border: `1px solid ${COLORS.border}`,
              borderRadius: 16, padding: '24px', marginBottom: 32, textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📱</div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, color: COLORS.textMid, marginBottom: 12,
              }}>Instagram Reel coming soon — follow <strong>@halalrated</strong> for the full feature.</p>
              <a href="https://instagram.com/halalrated" target="_blank" rel="noreferrer" style={{
                display: 'inline-block', background: COLORS.green, color: 'white',
                borderRadius: 8, padding: '8px 16px', textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              }}>Follow @halalrated →</a>
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
                  <span style={{ fontSize: 16 }}>✓</span>
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
    </div>
  );
}
