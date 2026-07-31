import { useState } from 'react'
// Mini try-on game: pick a polish colour, finish and nail shape,
// then tap individual nails on the SVG hand (or lacquer all five).
const COLORS = [
  ['Ballet Slipper', '#f4c8d0'],
  ['Rose Nude', '#e2a795'],
  ['Blush Beige', '#e9cdb2'],
  ['Milky White', '#f7f1ea'],
  ['Dusty Mauve', '#c4879f'],
  ['Coral Crush', '#f2766b'],
  ['Classic Red', '#b3232e'],
  ['Burgundy', '#722030'],
  ['Terracotta', '#c9714a'],
  ['Lavender Milk', '#cdb4dc'],
  ['Sage Whisper', '#a9c0a4'],
  ['Espresso', '#4b2d24'],
]
const FINISHES = [
  ['solid', 'Crème'],
  ['french', 'French tip'],
  ['ombre', 'Ombré'],
  ['glitter', 'Glitter'],
]
const SHAPES = [
  ['round', 'Round'],
  ['square', 'Square'],
  ['almond', 'Almond'],
  ['stiletto', 'Stiletto'],
]
// Nail anchor points on the hand SVG: centre, size, rotation.
const FINGERS = [
  { id: 'pinky', x: 108, y: 216, w: 28, h: 36, rot: -5 },
  { id: 'ring', x: 167, y: 156, w: 32, h: 42, rot: -2 },
  { id: 'middle', x: 230, y: 136, w: 34, h: 44, rot: 0 },
  { id: 'index', x: 293, y: 166, w: 32, h: 42, rot: 2 },
  { id: 'thumb', x: 404, y: 345, w: 32, h: 40, rot: 50 },
]
// Deterministic sparkle layout for the glitter finish (fractions of nail size).
const SPARKS = [
  [-0.25, -0.3, 1.6], [0.2, -0.55, 1.2], [0.05, -0.1, 2], [-0.3, 0.25, 1.3],
  [0.3, 0.15, 1.7], [0.12, 0.45, 1.2], [-0.12, 0.6, 1.5], [0.28, -0.25, 1],
  [-0.05, -0.65, 1.1], [-0.35, -0.05, 1], [0.35, 0.45, 1.2], [0, 0.25, 1],
]
function nailPath(shape, w, h) {
  const hw = w / 2
  const hh = h / 2
  switch (shape) {
    case 'square':
      return `M ${-hw} ${hh} L ${-hw} ${-hh + 6} Q ${-hw} ${-hh} ${-hw + 6} ${-hh} L ${hw - 6} ${-hh} Q ${hw} ${-hh} ${hw} ${-hh + 6} L ${hw} ${hh} Q 0 ${hh + 5} ${-hw} ${hh} Z`
    case 'almond':
      return `M ${-hw} ${hh} C ${-hw} ${-hh * 0.2} ${-hw * 0.7} ${-hh * 0.85} 0 ${-hh} C ${hw * 0.7} ${-hh * 0.85} ${hw} ${-hh * 0.2} ${hw} ${hh} Q 0 ${hh + 5} ${-hw} ${hh} Z`
    case 'stiletto':
      return `M ${-hw} ${hh} C ${-hw} 0 ${-hw * 0.5} ${-hh * 0.7} 0 ${-hh * 1.15} C ${hw * 0.5} ${-hh * 0.7} ${hw} 0 ${hw} ${hh} Q 0 ${hh + 5} ${-hw} ${hh} Z`
    default: // round
      return `M ${-hw} ${hh} L ${-hw} ${-hh * 0.35} Q ${-hw} ${-hh} 0 ${-hh} Q ${hw} ${-hh} ${hw} ${-hh * 0.35} L ${hw} ${hh} Q 0 ${hh + 5} ${-hw} ${hh} Z`
  }
}
function Nail({ f, nail, onClick }) {
  const { color, finish, shape } = nail
  const d = nailPath(color ? shape : 'round', f.w, f.h)
  const gid = `omb-${f.id}`
  const cid = `clip-${f.id}`
  const baseFill =
    finish === 'ombre' && color ? `url(#${gid})`
    : finish === 'french' && color ? '#f2dccb'
    : color || '#f7ded2'
  return (
    <g
      className="nail"
      transform={`translate(${f.x} ${f.y}) rotate(${f.rot})`}
      onClick={onClick}
    >
      <defs>
        <clipPath id={cid}>
          <path d={d} />
        </clipPath>
        {finish === 'ombre' && color && (
          <linearGradient id={gid} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0.05" stopColor="#f7ded2" />
            <stop offset="0.85" stopColor={color} />
          </linearGradient>
        )}
      </defs>
      <path d={d} fill={baseFill} stroke="rgba(120,60,40,0.25)" strokeWidth="1.5" />
      {finish === 'french' && color && (
        <rect x={-f.w} y={-f.h} width={f.w * 2} height={f.h * 0.88} fill={color} clipPath={`url(#${cid})`} />
      )}
      {finish === 'glitter' && color && (
        <g clipPath={`url(#${cid})`}>
          {SPARKS.map(([fx, fy, r], i) => (
            <circle key={i} cx={fx * f.w} cy={(fy * f.h) / 2} r={r} fill={i % 3 ? '#fff' : '#ffe3b3'} opacity="0.85" />
          ))}
        </g>
      )}
      <ellipse
        cx={-f.w * 0.18} cy={-f.h * 0.18} rx={f.w * 0.16} ry={f.h * 0.22}
        fill="#fff" opacity="0.35" clipPath={`url(#${cid})`}
      />
    </g>
  )
}
function Hand({ nails, onNail }) {
  return (
    <svg viewBox="0 0 460 520" role="img" aria-label="Interactive hand — tap a nail to paint it">
      <g fill="#f3cdb1">
        <rect x="86" y="190" width="44" height="180" rx="22" />
        <rect x="142" y="130" width="50" height="240" rx="25" />
        <rect x="204" y="110" width="52" height="260" rx="26" />
        <rect x="267" y="140" width="52" height="230" rx="26" />
        <rect x="339" y="305" width="46" height="150" rx="23" transform="rotate(50 362 380)" />
        <ellipse cx="318" cy="420" rx="52" ry="64" />
        <rect x="86" y="330" width="244" height="172" rx="42" />
      </g>
      <g stroke="#dfa98a" strokeWidth="2" strokeLinecap="round" opacity="0.55" fill="none">
        <path d="M 104 302 q 5 6 0 12" />
        <path d="M 163 270 q 5 6 0 12" />
        <path d="M 226 254 q 5 6 0 12" />
        <path d="M 289 278 q 5 6 0 12" />
      </g>
      {FINGERS.map((f) => (
        <Nail key={f.id} f={f} nail={nails[f.id]} onClick={() => onNail(f.id)} />
      ))}
    </svg>
  )
}
const EMPTY = { color: null, finish: 'solid', shape: 'round' }
const allNails = (value) => Object.fromEntries(FINGERS.map((f) => [f.id, { ...value }]))
export default function NailStudio() {
  const [sel, setSel] = useState({ color: '#c4879f', finish: 'solid', shape: 'almond' })
  const [nails, setNails] = useState(() => allNails(EMPTY))
  const colorName = (COLORS.find(([, hex]) => hex === sel.color) || ['Custom'])[0]
  const finishName = FINISHES.find(([k]) => k === sel.finish)[1]
  const shapeName = SHAPES.find(([k]) => k === sel.shape)[1]
  return (
    <div className="studio">
      <div className="studio-hand">
        <Hand nails={nails} onNail={(id) => setNails((n) => ({ ...n, [id]: { ...sel } }))} />
        <p className="studio-hint">Tap any nail to paint it with your selection</p>
      </div>
      <div className="studio-controls">
        <h3>1 · Pick a polish</h3>
        <div className="swatches">
          {COLORS.map(([name, hex]) => (
            <button
              key={hex}
              title={name}
              aria-label={name}
              className={'swatch' + (sel.color === hex ? ' on' : '')}
              style={{ background: hex }}
              onClick={() => setSel((s) => ({ ...s, color: hex }))}
            />
          ))}
        </div>
        <h3>2 · Finish</h3>
        <div className="pills">
          {FINISHES.map(([k, label]) => (
            <button key={k} className={'pill' + (sel.finish === k ? ' on' : '')} onClick={() => setSel((s) => ({ ...s, finish: k }))}>
              {label}
            </button>
          ))}
        </div>
        <h3>3 · Shape</h3>
        <div className="pills">
          {SHAPES.map(([k, label]) => (
            <button key={k} className={'pill pill-shape' + (sel.shape === k ? ' on' : '')} onClick={() => setSel((s) => ({ ...s, shape: k }))}>
              <svg viewBox="-14 -22 28 44" width="15" height="22" aria-hidden="true">
                <path d={nailPath(k, 22, 30)} fill="currentColor" />
              </svg>
              {label}
            </button>
          ))}
        </div>
        <p className="studio-sel">
          Your pick: <strong>{colorName}</strong> · {finishName} · {shapeName}
        </p>
        <div className="studio-actions">
          <button className="btn-primary" onClick={() => setNails(allNails(sel))}>Lacquer all five :nail_care:</button>
          <button className="btn-ghost" onClick={() => setNails(allNails(EMPTY))}>Start over</button>
        </div>
      </div>
    </div>
  )
}

