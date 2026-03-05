import React from 'react';
import { restaurants, categories } from './data.js';

const COLORS = {
  green: '#0f4d2a', greenLight: '#e6f0eb', greenDark: '#0a3520',
  gold: '#C5960C', goldLight: '#fdf6e3',
  bg: '#F7F7F5', cardWhite: '#FFFFFF',
  textDark: '#111111', textMid: '#4a4a4a', textLight: '#777777',
  border: '#E2E2DF',
};

function SimpleNav({ navigate, title }) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${COLORS.border}`, padding: '0 24px' }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" />
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', height: 64, gap: 16 }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textMid }}>← Back</button>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: COLORS.textDark }}>Halal <span style={{ color: COLORS.gold }}>Rated</span></button>
      </div>
    </nav>
  );
}

export function CityPage({ slug, navigate }) {
  const cityName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const rests = restaurants.filter(r => r.city.toLowerCase().includes(slug.toLowerCase()));

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <SimpleNav navigate={navigate} />
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
      <SimpleNav navigate={navigate} />
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
      <SimpleNav navigate={navigate} />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '56px 24px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: COLORS.textDark, marginBottom: 8 }}>Contact Us</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.textMid, marginBottom: 40, lineHeight: 1.6 }}>Questions, partnerships, restaurant submissions, or just want to say hi.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '', label: 'Email', value: 'hello@halalrated.com', href: 'mailto:hello@halalrated.com' },
            { icon: '', label: 'Instagram', value: '@halalrated', href: 'https://instagram.com/halalrated' },
          ].map(item => (
            <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 16, background: COLORS.cardWhite, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '16px 20px', textDecoration: 'none', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
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
      <SimpleNav navigate={navigate} />
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



