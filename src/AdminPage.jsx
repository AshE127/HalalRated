import React, { useState } from 'react';
import { restaurants as initialRestaurants, categories } from './data.js';

const COLORS = {
  green: '#0f4d2a', greenLight: '#e6f0eb', greenDark: '#0a3520',
  gold: '#C5960C',
  bg: '#F7F7F5', cardWhite: '#FFFFFF',
  textDark: '#111111', textMid: '#4a4a4a', textLight: '#777777',
  border: '#E2E2DF',
  red: '#c0392b', redLight: '#fdf0ef',
};

const ADMIN_PASSWORD = 'halalrated2025';

export default function AdminPage({ navigate }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem('hr_restaurants') || 'null') || initialRestaurants
  );
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(false);

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false); }
    else setPwError(true);
  };

  const select = (r) => setSelected({ ...r });

  const update = (field, value) => setSelected(s => ({ ...s, [field]: value }));

  const updateTags = (val) => setSelected(s => ({
    ...s,
    tags: val.split(',').map(t => t.trim()).filter(Boolean),
  }));

  const save = () => {
    const updated = data.map(r => r.id === selected.id ? selected : r);
    setData(updated);
    localStorage.setItem('hr_restaurants', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const input = (label, field, type = 'text', multiline = false) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{
        display: 'block', fontFamily: "'DM Sans', sans-serif",
        fontSize: 12, fontWeight: 600, color: COLORS.textLight,
        letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 6,
      }}>{label}</label>
      {multiline ? (
        <textarea
          value={selected[field] || ''}
          onChange={e => update(field, e.target.value)}
          rows={3}
          style={inputStyle}
        />
      ) : (
        <input
          type={type}
          value={selected[field] || ''}
          onChange={e => update(field, e.target.value)}
          style={inputStyle}
        />
      )}
    </div>
  );

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8, fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    color: COLORS.textDark,
    background: 'white',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
  };

  if (!authed) return (
    <div style={{
      minHeight: '100vh', background: COLORS.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        background: 'white', border: `1px solid ${COLORS.border}`,
        borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 380,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22, fontWeight: 700, color: COLORS.textDark, marginBottom: 4,
          }}>Halal <span style={{ color: COLORS.gold }}>Rated</span></div>
          <div style={{ fontSize: 13, color: COLORS.textLight }}>Admin — Restaurant Editor</div>
        </div>
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{
            ...inputStyle,
            marginBottom: 12,
            borderColor: pwError ? COLORS.red : COLORS.border,
          }}
        />
        {pwError && (
          <div style={{ fontSize: 13, color: COLORS.red, marginBottom: 12 }}>Incorrect password.</div>
        )}
        <button onClick={login} style={{
          width: '100%', background: COLORS.green, color: 'white',
          border: 'none', borderRadius: 8, padding: '12px',
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
          cursor: 'pointer',
        }}>Sign In</button>
        <button onClick={() => navigate('/')} style={{
          width: '100%', background: 'none', color: COLORS.textLight,
          border: 'none', marginTop: 12, padding: '8px',
          fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: 'pointer',
        }}>← Back to site</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <nav style={{
        background: COLORS.greenDark, padding: '0 24px',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate('/')} style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white',
              borderRadius: 6, padding: '5px 12px', fontSize: 13, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
            }}>← Site</button>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 16, fontWeight: 700, color: 'white',
            }}>Admin</span>
          </div>
          {saved && (
            <div style={{
              background: 'rgba(255,255,255,0.15)', color: 'white',
              borderRadius: 6, padding: '5px 14px', fontSize: 13, fontWeight: 600,
            }}>Saved</div>
          )}
        </div>
      </nav>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px', display: 'flex', gap: 24 }}>
        {/* Restaurant list */}
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: COLORS.textLight,
            letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 12,
          }}>Restaurants ({data.length})</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {data.map(r => {
              const cat = categories.find(c => c.id === r.category);
              const isSelected = selected?.id === r.id;
              return (
                <button key={r.id} onClick={() => select(r)} style={{
                  background: isSelected ? COLORS.green : 'white',
                  border: `1px solid ${isSelected ? COLORS.green : COLORS.border}`,
                  borderRadius: 8, padding: '10px 14px',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s',
                }}>
                  <div style={{
                    fontSize: 13, fontWeight: 600,
                    color: isSelected ? 'white' : COLORS.textDark,
                    marginBottom: 2,
                  }}>{r.name}</div>
                  <div style={{
                    fontSize: 11,
                    color: isSelected ? 'rgba(255,255,255,0.7)' : COLORS.textLight,
                  }}>{r.city} · {cat?.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor */}
        {selected ? (
          <div style={{ flex: 1 }}>
            <div style={{
              background: 'white', border: `1px solid ${COLORS.border}`,
              borderRadius: 16, overflow: 'hidden',
            }}>
              {/* Editor header */}
              <div style={{
                padding: '20px 28px', borderBottom: `1px solid ${COLORS.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textDark, fontFamily: "'Playfair Display', serif" }}>
                    {selected.name}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.textLight, marginTop: 2 }}>
                    /restaurant/{selected.slug}
                  </div>
                </div>
                <button onClick={save} style={{
                  background: COLORS.green, color: 'white',
                  border: 'none', borderRadius: 8, padding: '10px 24px',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
                  cursor: 'pointer',
                }}>Save Changes</button>
              </div>

              <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                {/* Left column */}
                <div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: COLORS.green,
                    letterSpacing: '0.5px', textTransform: 'uppercase',
                    marginBottom: 16, paddingBottom: 8, borderBottom: `1px solid ${COLORS.border}`,
                  }}>Restaurant Info</div>

                  {input('Name', 'name')}
                  {input('Slug (URL)', 'slug')}
                  {input('City', 'city')}
                  {input('Cuisine', 'cuisine')}

                  <div style={{ marginBottom: 18 }}>
                    <label style={{
                      display: 'block', fontSize: 12, fontWeight: 600, color: COLORS.textLight,
                      letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 6,
                    }}>Category</label>
                    <select
                      value={selected.category}
                      onChange={e => update('category', e.target.value)}
                      style={{ ...inputStyle }}
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <label style={{
                      display: 'block', fontSize: 12, fontWeight: 600, color: COLORS.textLight,
                      letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 6,
                    }}>Tags (comma-separated)</label>
                    <input
                      value={(selected.tags || []).join(', ')}
                      onChange={e => updateTags(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  {input('Description', 'description', 'text', true)}

                  <div style={{ marginBottom: 18 }}>
                    <label style={{
                      display: 'block', fontSize: 12, fontWeight: 600, color: COLORS.textLight,
                      letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 6,
                    }}>Halal Status</label>
                    <div style={{ display: 'flex', gap: 12 }}>
                      {[true, false].map(val => (
                        <button key={String(val)} onClick={() => update('isHalal', val)} style={{
                          flex: 1, padding: '10px',
                          border: `1px solid ${selected.isHalal === val ? COLORS.green : COLORS.border}`,
                          background: selected.isHalal === val ? COLORS.greenLight : 'white',
                          borderRadius: 8, cursor: 'pointer',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13, fontWeight: 600,
                          color: selected.isHalal === val ? COLORS.green : COLORS.textMid,
                        }}>{val ? 'Halal' : 'Not Halal'}</button>
                      ))}
                    </div>
                  </div>

                  {input('Halal Note', 'halalNote', 'text', true)}
                </div>

                {/* Right column */}
                <div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: COLORS.green,
                    letterSpacing: '0.5px', textTransform: 'uppercase',
                    marginBottom: 16, paddingBottom: 8, borderBottom: `1px solid ${COLORS.border}`,
                  }}>SEO / Meta Tags</div>

                  {input('SEO Title', 'seoTitle')}
                  {input('SEO Description', 'seoDescription', 'text', true)}

                  <div style={{
                    fontSize: 11, fontWeight: 700, color: COLORS.green,
                    letterSpacing: '0.5px', textTransform: 'uppercase',
                    marginBottom: 16, paddingBottom: 8, borderBottom: `1px solid ${COLORS.border}`,
                    marginTop: 28,
                  }}>Flags</div>

                  {['featured', 'spotlight'].map(flag => (
                    <div key={flag} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 0', borderBottom: `1px solid ${COLORS.border}`,
                    }}>
                      <span style={{ fontSize: 14, color: COLORS.textDark, textTransform: 'capitalize' }}>{flag}</span>
                      <button onClick={() => update(flag, !selected[flag])} style={{
                        width: 44, height: 24,
                        background: selected[flag] ? COLORS.green : '#ddd',
                        border: 'none', borderRadius: 12, cursor: 'pointer',
                        position: 'relative', transition: 'background 0.2s',
                      }}>
                        <div style={{
                          position: 'absolute', top: 3,
                          left: selected[flag] ? 22 : 3,
                          width: 18, height: 18,
                          background: 'white', borderRadius: '50%',
                          transition: 'left 0.2s',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        }} />
                      </button>
                    </div>
                  ))}

                  <div style={{
                    background: COLORS.greenLight, borderRadius: 10,
                    padding: '16px', marginTop: 24,
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.green, marginBottom: 8 }}>
                      Live URL Preview
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.textMid, wordBreak: 'break-all' }}>
                      halalrated.com/restaurant/{selected.slug}
                    </div>
                  </div>

                  <div style={{ marginTop: 16, background: '#fffbf0', border: `1px solid #f0e0a0`, borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#8a6d00', marginBottom: 4 }}>Note</div>
                    <div style={{ fontSize: 12, color: '#6b5300', lineHeight: 1.5 }}>
                      Changes saved here update the live site on next deploy. To make permanent, copy changes to <code>data.js</code> and push to GitHub.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: COLORS.textLight, fontFamily: "'DM Sans', sans-serif",
          }}>
            Select a restaurant to edit
          </div>
        )}
      </div>
    </div>
  );
}
