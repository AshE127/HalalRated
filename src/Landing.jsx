import React, { useState, useEffect } from 'react';
import { restaurants, categories, cities } from './data.js';

const COLORS = {
  green: '#0f4d2a',
  greenLight: '#e6f0eb',
  greenDark: '#0a3520',
  gold: '#C5960C',
  goldLight: '#fdf6e3',
  bg: '#F7F7F5',
  cardWhite: '#FFFFFF',
  textDark: '#111111',
  textMid: '#4a4a4a',
  textLight: '#777777',
  border: '#E2E2DF',
};

// Restaurant of the Week (sponsored slot)
const RESTAURANT_OF_WEEK = {
  name: "Charred",
  city: "Herndon, VA",
  tagline: "Wood-fire halal burgers that hit every single time.",
  category: "Hidden Halal",
  slug: "charred",
};

function DropdownNav({ label, items, navigate, onClose }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '6px 12px', borderRadius: 6,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14, fontWeight: 500,
          color: open ? COLORS.green : COLORS.textMid,
          display: 'flex', alignItems: 'center', gap: 4,
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = COLORS.green}
        onMouseLeave={e => { if (!open) e.currentTarget.style.color = COLORS.textMid; }}
      >
        {label}
        <span style={{
          fontSize: 10, marginTop: 1,
          display: 'inline-block',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}>▾</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0,
          background: 'white',
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
          minWidth: 200, zIndex: 200,
          overflow: 'hidden',
        }}>
          {items.map((item, i) => (
            <button key={item.path}
              onClick={() => {
                if (item.external) window.location.href = item.path;
                else navigate(item.path);
                setOpen(false);
                if (onClose) onClose();
              }}
              style={{
                display: 'block', width: '100%',
                background: 'none', border: 'none',
                borderBottom: i < items.length - 1 ? `1px solid ${COLORS.border}` : 'none',
                cursor: 'pointer', textAlign: 'left',
                padding: '11px 16px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 500,
                color: COLORS.textDark,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = COLORS.greenLight; e.currentTarget.style.color = COLORS.green; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = COLORS.textDark; }}
            >
              {item.label}
              {item.sub && <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 1 }}>{item.sub}</div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


function ScrollingCarousel({ onSelect }) {
  const pills = [
    // Dishes
    'Biryani', 'Shawarma', 'Kabob', 'Wings', 'Burgers', 'Karahi', 'Mandi',
    'Korean BBQ', 'Pizza', 'Buffet', 'Chaat', 'Nihari', 'Haleem', 'Roti',
    // Cuisines
    'Pakistani', 'Afghan', 'Lebanese', 'Chinese', 'Korean', 'Indian',
    'Mediterranean', 'American', 'Turkish', 'Fusion',
    // Cities
    'Herndon', 'Chantilly', 'Sterling', 'Ashburn', 'Falls Church', 'Fairfax',
    // Vibes
    'Late Night', 'Family Friendly', 'Hidden Gem', 'Halal Certified',
  ];

  // Duplicate for seamless loop
  const allPills = [...pills, ...pills];

  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .carousel-track {
          display: flex;
          gap: 10px;
          width: max-content;
          animation: scrollLeft 70s linear infinite;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
        .carousel-pill {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          color: white;
          border-radius: 100px;
          padding: 7px 16px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .carousel-pill:hover {
          background: rgba(255,255,255,0.24);
          border-color: rgba(255,255,255,0.4);
        }
      `}</style>
      <div className="carousel-track">
        {allPills.map((pill, i) => (
          <button
            key={i}
            className="carousel-pill"
            onClick={() => onSelect(pill)}
          >{pill}</button>
        ))}
      </div>
    </div>
  );
}

function Nav({ navigate, menuOpen, setMenuOpen }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: 'rgba(250, 250, 248, 0.97)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${COLORS.border}`,
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: COLORS.green,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: COLORS.gold, fontSize: 16,
          }}>✓</div>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20, fontWeight: 700,
            color: COLORS.textDark, letterSpacing: '-0.3px',
          }}>
            Halal <span style={{ color: COLORS.gold }}>Rated</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: 4 }}>
          {[
            { label: 'Guides', path: '/guide', external: true },
            { label: 'About', path: '/about' },
          ].map(item => (
            <button key={item.path}
              onClick={() => item.external ? window.location.href = item.path : navigate(item.path)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px 12px', borderRadius: 6,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 500,
                color: COLORS.textMid,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.target.style.color = COLORS.green}
              onMouseLeave={e => e.target.style.color = COLORS.textMid}
            >{item.label}</button>
          ))}
          <button onClick={() => navigate('/for-restaurants')} style={{
            background: COLORS.green, color: 'white',
            border: 'none', borderRadius: 8, cursor: 'pointer',
            padding: '8px 16px', marginLeft: 8,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, fontWeight: 600,
          }}>Get Featured</button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: isMobile ? 'flex' : 'none',
            alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
            background: menuOpen ? COLORS.green : COLORS.greenLight,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            cursor: 'pointer',
            width: 40, height: 40,
            gap: 5,
            padding: 0,
            zIndex: 201,
            position: 'relative',
          }}
        >
          <span style={{ display: 'block', width: 18, height: 2, background: menuOpen ? 'white' : COLORS.green, borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: menuOpen ? 'none' : 'block', width: 18, height: 2, background: COLORS.green, borderRadius: 2 }} />
          <span style={{ display: 'block', width: 18, height: 2, background: menuOpen ? 'white' : COLORS.green, borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: '#F7F7F5',
          zIndex: 199,
          padding: '0 24px 40px',
          overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {/* Mobile menu header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 64, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 8,
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: COLORS.textDark }}>
              Halal <span style={{ color: COLORS.gold }}>Rated</span>
            </span>
            <button onClick={() => setMenuOpen(false)} style={{
              background: COLORS.green, border: 'none', borderRadius: 8,
              width: 36, height: 36, cursor: 'pointer',
              color: 'white', fontSize: 18, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✕</button>
          </div>

          {[
            { label: 'Guides', path: '/guide', external: true },
            { label: 'About', path: '/about' },
            { label: 'Contact', path: '/contact' },
            { label: 'For Restaurants', path: '/for-restaurants' },
          ].map(item => (
            <button key={item.path} onClick={() => { item.external ? window.location.href = item.path : navigate(item.path); setMenuOpen(false); }} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '13px 8px',
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500,
              color: COLORS.textDark, textAlign: 'left',
              borderBottom: `1px solid ${COLORS.border}`,
            }}>{item.label}</button>
          ))}
          <button onClick={() => { navigate('/for-restaurants'); setMenuOpen(false); }} style={{
            marginTop: 20, background: COLORS.green, color: 'white',
            border: 'none', borderRadius: 12, cursor: 'pointer',
            padding: '14px 24px',
            fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600,
          }}>Get Featured on Halal Rated</button>
        </div>
      )}
    </nav>
  );
}

function RestaurantCard({ restaurant, navigate }) {
  const cat = categories.find(c => c.id === restaurant.category);
  return (
    <div
      onClick={() => navigate(`/restaurant/${restaurant.slug}`)}
      style={{
        background: COLORS.cardWhite,
        borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(27,115,64,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image placeholder with gradient */}
      <div style={{
        height: 180,
        background: `linear-gradient(135deg, ${COLORS.greenDark}, ${COLORS.green})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>

        {restaurant.spotlight && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: COLORS.gold,
            color: 'white', borderRadius: 20,
            padding: '3px 10px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
          }}>FEATURED</div>
        )}
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          borderRadius: 20, padding: '3px 10px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12, fontWeight: 500, color: 'white',
        }}>{restaurant.city}, {restaurant.state}</div>
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span style={{
            background: COLORS.greenLight, color: COLORS.green,
            borderRadius: 20, padding: '2px 8px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, fontWeight: 600,
          }}>{cat?.name || restaurant.category}</span>
        </div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18, fontWeight: 700,
          color: COLORS.textDark, margin: '0 0 6px',
          lineHeight: 1.3,
        }}>{restaurant.name}</h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, color: COLORS.textMid,
          margin: '0 0 12px',
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{restaurant.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {restaurant.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              background: '#f5f5f3',
              color: COLORS.textLight,
              borderRadius: 4, padding: '2px 8px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Landing({ navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCity, setActiveCity] = useState('All');

  const filteredRestaurants = restaurants.filter(r => {
    const matchSearch = !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCity = activeCity === 'All' || r.city.includes(activeCity);
    return matchSearch && matchCity;
  });

  const quickTags = ['Biryani', 'Burgers', 'Shawarma', 'Korean BBQ', 'Late Night', 'Buffet', 'Pizza', 'Wings'];

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .hero-title { font-size: 38px !important; }
          .stats-strip { flex-direction: column !important; gap: 16px !important; }
          .category-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .restaurant-grid { grid-template-columns: 1fr !important; }
          .rotw-inner { flex-direction: column !important; }
          .city-scroll { flex-wrap: wrap !important; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.6s 0.15s ease forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.6s 0.3s ease forwards; opacity: 0; }
      `}</style>

      <Nav navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* HERO */}
      <section style={{
        background: `linear-gradient(160deg, ${COLORS.greenDark} 0%, ${COLORS.green} 60%, #2d9e5f 100%)`,
        padding: '72px 24px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 320, height: 320, borderRadius: '50%',
          background: 'rgba(197,150,12,0.12)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -40,
          width: 280, height: 280, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div className="fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
            borderRadius: 20, padding: '5px 14px', marginBottom: 20,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 600, color: COLORS.gold,
            letterSpacing: '0.5px',
          }}>
            Northern Virginia's Halal Food Guide
          </div>

          <h1 className="fade-up-2 hero-title" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 54, fontWeight: 700,
            color: 'white', lineHeight: 1.15,
            marginBottom: 16, letterSpacing: '-1px',
          }}>
            If it's <span style={{ color: COLORS.gold }}>halal,</span><br />
            you'll see it here.
          </h1>

          <p className="fade-up-3" style={{
            fontSize: 17, color: 'rgba(255,255,255,0.8)',
            marginBottom: 32, lineHeight: 1.6,
            maxWidth: 520, margin: '0 auto 32px',
          }}>
            Spotlighting NOVA's best halal restaurants — from neighborhood classics to cuisines you wouldn't expect to find halal.
          </p>

          {/* Search */}
          <div className="fade-up-3" style={{
            display: 'flex', gap: 10, maxWidth: 560, margin: '0 auto 20px',
          }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && document.getElementById('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' })}
              placeholder="Search restaurant, dish, or city..."
              style={{
                flex: 1, padding: '14px 18px',
                borderRadius: 12, border: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, outline: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
            />
            <button
              onClick={() => document.getElementById('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' })}
              style={{
                background: COLORS.green, color: 'white',
                border: 'none', borderRadius: 12, cursor: 'pointer',
                padding: '14px 22px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 600, letterSpacing: '0.3px',
                boxShadow: '0 4px 20px rgba(15,77,42,0.35)',
                whiteSpace: 'nowrap',
              }}>Search</button>
          </div>

          {/* Scrolling pill carousel */}
          <div style={{ marginTop: 20, maxWidth: 560, margin: '20px auto 0', overflow: 'hidden', borderRadius: 8 }}>
            <ScrollingCarousel onSelect={(tag) => { setSearch(tag); setTimeout(() => document.getElementById('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); }} />
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={{
        background: COLORS.cardWhite,
        borderBottom: `1px solid ${COLORS.border}`,
        padding: '20px 24px',
      }}>
        <div className="stats-strip" style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 48,
        }}>
          {[
            { num: `${restaurants.length}+`, label: 'Restaurants Featured' },
            { num: '9', label: 'Cities in NOVA' },
            { num: '5', label: 'Categories' },
            { num: '100%', label: 'Halal Verified' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26, fontWeight: 700, color: COLORS.green,
              }}>{stat.num}</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, color: COLORS.textLight, fontWeight: 500,
                letterSpacing: '0.3px',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RESTAURANT OF THE WEEK */}
      <section style={{ padding: '48px 24px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
          }}>
            <div style={{
              width: 4, height: 24, background: COLORS.gold, borderRadius: 2,
            }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, fontWeight: 700, color: COLORS.gold,
              letterSpacing: '1px', textTransform: 'uppercase',
            }}>Restaurant of the Week</span>
          </div>
          <div
            className="rotw-inner"
            onClick={() => navigate(`/restaurant/${RESTAURANT_OF_WEEK.slug}`)}
            style={{
              background: `linear-gradient(135deg, ${COLORS.greenDark} 0%, ${COLORS.green} 100%)`,
              borderRadius: 20, padding: '32px 36px',
              display: 'flex', alignItems: 'center', gap: 32,
              cursor: 'pointer',
              position: 'relative', overflow: 'hidden',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              position: 'absolute', right: -40, top: -40,
              width: 220, height: 220, borderRadius: '50%',
              background: 'rgba(197,150,12,0.15)',
              pointerEvents: 'none',
            }} />
            <div style={{
              width: 80, height: 80, borderRadius: 20,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36, flexShrink: 0,
            }}>🔥</div>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: COLORS.gold, borderRadius: 20,
                padding: '3px 10px', marginBottom: 10,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, fontWeight: 700, color: 'white',
                letterSpacing: '0.5px',
              }}>⭐ RESTAURANT OF THE WEEK</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 28, fontWeight: 700, color: 'white',
                marginBottom: 6, letterSpacing: '-0.3px',
              }}>{RESTAURANT_OF_WEEK.name}</h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, color: 'rgba(255,255,255,0.75)',
                marginBottom: 6,
              }}>{RESTAURANT_OF_WEEK.city} · {RESTAURANT_OF_WEEK.category}</p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, color: 'rgba(255,255,255,0.9)',
                fontStyle: 'italic',
              }}>{RESTAURANT_OF_WEEK.tagline}</p>
            </div>
            <div style={{
              color: COLORS.gold, fontSize: 24, flexShrink: 0,
            }}>→</div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '48px 24px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26, fontWeight: 700, color: COLORS.textDark,
            }}>Browse by Category</h2>
          </div>
          <div className="category-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 12,
          }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => navigate(`/category/${cat.slug}`)} style={{
                background: COLORS.cardWhite,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14, padding: '20px 16px',
                cursor: 'pointer', textAlign: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = COLORS.green;
                e.currentTarget.style.background = COLORS.greenLight;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.background = COLORS.cardWhite;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, fontWeight: 700, color: COLORS.textDark,
                  marginBottom: 4,
                }}>{cat.name}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11, color: COLORS.textLight, lineHeight: 1.3,
                }}>{cat.description}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

{/* HIDDEN HALAL BANNER */}
      <section style={{ padding: '56px 24px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            background: COLORS.goldLight,
            border: `1px solid rgba(197,150,12,0.3)`,
            borderRadius: 20, padding: '36px 40px',
            display: 'flex', alignItems: 'center', gap: 32,
          }}>
            <div style={{ fontSize: 52, flexShrink: 0 }}>🔍</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, fontWeight: 700, color: COLORS.gold,
                letterSpacing: '1px', textTransform: 'uppercase',
                marginBottom: 8,
              }}>Hidden Halal Series</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24, fontWeight: 700, color: COLORS.textDark,
                marginBottom: 8, letterSpacing: '-0.3px',
              }}>You didn't know these spots were halal.</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, color: COLORS.textMid, lineHeight: 1.6,
                marginBottom: 16,
              }}>
                Mainstream restaurants with halal options that fly under the radar. Korean BBQ, Chinese, smokehouse BBQ, Italian — all halal, all verified.
              </p>
              <button onClick={() => navigate('/category/hidden-halal')} style={{
                background: COLORS.gold, color: 'white',
                border: 'none', borderRadius: 8, cursor: 'pointer',
                padding: '10px 20px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 600,
              }}>Explore Hidden Halal →</button>
            </div>
          </div>
        </div>
      </section>

      {/* CITY FILTER */}
      <section id="results-section" style={{ padding: '40px 24px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26, fontWeight: 700, color: COLORS.textDark,
            }}>
              {search ? `Results for "${search}"` : 'Featured Restaurants'}
            </h2>
          </div>

          {/* City filter pills */}
          {!search && (
            <div className="city-scroll" style={{
              display: 'flex', gap: 8, marginBottom: 24,
              overflowX: 'auto', paddingBottom: 4,
            }}>
              {['All', 'Herndon', 'Chantilly', 'Sterling', 'Ashburn', 'Fairfax', 'Falls Church'].map(city => (
                <button key={city} onClick={() => setActiveCity(city)} style={{
                  background: activeCity === city ? COLORS.green : COLORS.cardWhite,
                  color: activeCity === city ? 'white' : COLORS.textMid,
                  border: `1px solid ${activeCity === city ? COLORS.green : COLORS.border}`,
                  borderRadius: 20, padding: '6px 16px', cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, fontWeight: 500,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}>{city}</button>
              ))}
            </div>
          )}

          {/* Restaurant Grid */}
          <div className="restaurant-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}>
            {filteredRestaurants.map(r => (
              <RestaurantCard key={r.id} restaurant={r} navigate={navigate} />
            ))}
          </div>
          {filteredRestaurants.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '60px 24px',
              fontFamily: "'DM Sans', sans-serif",
              color: COLORS.textLight, fontSize: 16,
            }}>
              No restaurants found for "{search}" — try a different search.
            </div>
          )}
        </div>
      </section>

      

      {/* EMAIL SUBSCRIPTION */}
      <section style={{ padding: '56px 24px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            background: COLORS.cardWhite,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 20, padding: '40px',
            textAlign: 'center',
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24, fontWeight: 700, color: COLORS.textDark,
              marginBottom: 8,
            }}>New spots, straight to your inbox.</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, color: COLORS.textMid,
              marginBottom: 24,
            }}>Weekly halal restaurant discoveries across Northern Virginia.</p>
            <form
              onSubmit={e => {
                e.preventDefault();
                const email = e.target.email.value;
                if (email) alert(`You're subscribed! We'll keep you updated at ${email}`);
              }}
              style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto' }}
            >
              <input
                name="email" type="email" placeholder="your@email.com" required
                style={{
                  flex: 1, padding: '12px 16px',
                  borderRadius: 10, border: `1px solid ${COLORS.border}`,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: 'none',
                }}
              />
              <button type="submit" style={{
                background: COLORS.green, color: 'white',
                border: 'none', borderRadius: 10, cursor: 'pointer',
                padding: '12px 20px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, fontWeight: 600,
                whiteSpace: 'nowrap',
              }}>Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOR RESTAURANTS CTA */}
      <section style={{ padding: '56px 24px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            background: `linear-gradient(135deg, ${COLORS.greenDark}, ${COLORS.green})`,
            borderRadius: 20, padding: '40px',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -50, right: -50,
              width: 200, height: 200, borderRadius: '50%',
              background: 'rgba(197,150,12,0.1)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative' }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26, fontWeight: 700, color: 'white',
                marginBottom: 10,
              }}>Own a halal restaurant in NOVA?</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, color: 'rgba(255,255,255,0.8)',
                marginBottom: 24, maxWidth: 480, margin: '0 auto 24px',
              }}>
                Get featured on Halal Rated — a permanent, searchable page, Instagram Reel, and exposure to NOVA's halal food community.
              </p>
              <button onClick={() => navigate('/for-restaurants')} style={{
                background: COLORS.gold, color: 'white',
                border: 'none', borderRadius: 10, cursor: 'pointer',
                padding: '12px 24px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, fontWeight: 600,
              }}>Get Your Restaurant Featured →</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '56px 24px 32px',
        marginTop: 56,
        borderTop: `1px solid ${COLORS.border}`,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            marginBottom: 32, flexWrap: 'wrap', gap: 24,
          }}>
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontWeight: 700, color: COLORS.textDark,
                marginBottom: 6,
              }}>Halal <span style={{ color: COLORS.gold }}>Rated</span></div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, color: COLORS.textLight, maxWidth: 240, lineHeight: 1.5,
              }}>Northern Virginia's halal food media brand. Spotlighting the best — positive coverage only.</p>
            </div>
            <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
              <div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12, fontWeight: 700, color: COLORS.textDark,
                  marginBottom: 12, letterSpacing: '0.5px', textTransform: 'uppercase',
                }}>Discover</div>
                {[
                  { label: 'Hidden Halal', path: '/category/hidden-halal' },
                  { label: 'Delicious Desi', path: '/category/delicious-desi' },
                  { label: 'Mezze Musts', path: '/category/mezze-musts' },
                  { label: 'Soy Selects', path: '/category/soy-selects' },
                ].map(l => (
                  <button key={l.path} onClick={() => navigate(l.path)} style={{
                    display: 'block', background: 'none', border: 'none',
                    cursor: 'pointer', padding: '3px 0',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, color: COLORS.textMid,
                  }}>{l.label}</button>
                ))}
              </div>
              <div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12, fontWeight: 700, color: COLORS.textDark,
                  marginBottom: 12, letterSpacing: '0.5px', textTransform: 'uppercase',
                }}>Company</div>
                {[
                  { label: 'About', path: '/about' },
                  { label: 'Contact', path: '/contact' },
                  { label: 'For Restaurants', path: '/for-restaurants' },
                  { label: 'Instagram', path: 'https://instagram.com/halalrated', external: true },
                  { label: 'TikTok', path: 'https://tiktok.com/@halalrated', external: true },
                ].map(l => (
                  <button key={l.label} onClick={() => l.external ? window.open(l.path, '_blank') : navigate(l.path)} style={{
                    display: 'block', background: 'none', border: 'none',
                    cursor: 'pointer', padding: '3px 0',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, color: COLORS.textMid,
                  }}>{l.label}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={{
            borderTop: `1px solid ${COLORS.border}`,
            paddingTop: 20,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 8,
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, color: COLORS.textLight,
            }}>© 2025 Halal Rated. All rights reserved.</span>
            <a href="mailto:hello@halalrated.com" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, color: COLORS.green, textDecoration: 'none',
            }}>hello@halalrated.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
