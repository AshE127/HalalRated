import React from 'react';
import { restaurants, categories } from './data.js';

const COLORS = {
  green: '#1B7340', greenLight: '#e8f5ee', greenDark: '#145a32',
  gold: '#C5960C', goldLight: '#fdf6e3',
  bg: '#FAFAF8', cardWhite: '#FFFFFF',
  textDark: '#1A1A1A', textMid: '#555555', textLight: '#888888',
  border: '#E8E8E6',
};

export default function CategoryPage({ slug, navigate }) {
  const cat = categories.find(c => c.slug === slug);
  const rests = restaurants.filter(r => r.category === slug);

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" />
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) { .rest-grid { grid-template-columns: 1fr !important; } }`}</style>

      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${COLORS.border}`, padding: '0 24px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', height: 64, gap: 16 }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textMid }}>← Back</button>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: COLORS.textDark }}>Halal <span style={{ color: COLORS.gold }}>Rated</span></button>
        </div>
      </nav>

      <div style={{
        background: `linear-gradient(135deg, ${COLORS.greenDark}, ${COLORS.green})`,
        padding: '56px 24px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{cat?.emoji || '🍽️'}</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: 'white', marginBottom: 8 }}>
            {cat?.name || slug}
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>
            {cat?.description} · {rests.length} {rests.length === 1 ? 'restaurant' : 'restaurants'} featured
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        {rests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: COLORS.textLight }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16 }}>More restaurants in this category coming soon!</p>
          </div>
        ) : (
          <div className="rest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {rests.map(r => (
              <div key={r.id} onClick={() => navigate(`/restaurant/${r.slug}`)}
                style={{
                  background: COLORS.cardWhite, border: `1px solid ${COLORS.border}`,
                  borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(27,115,64,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ height: 160, background: `linear-gradient(135deg, ${COLORS.greenDark}, ${COLORS.green})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
                  {cat?.emoji || '🍽️'}
                </div>
                <div style={{ padding: '16px 18px 18px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: COLORS.textDark, marginBottom: 4 }}>{r.name}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.textLight, marginBottom: 8 }}>📍 {r.city} · {r.cuisine}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.textMid, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
