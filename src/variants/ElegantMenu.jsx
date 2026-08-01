import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// Full service menu — Style A (Blush & Bloom), reached via #/menu.
const MENU = [
  {
    category: 'Manicure',
    slug: 'manicure',
    items: ['Signature Manicure', 'Gel Manicure'],
  },
  {
    category: 'Pedicure',
    slug: 'pedicure',
    items: ['Signature Pedicure', 'Gel Pedicure'],
  },
  {
    category: 'Full Set & Fill-Ins',
    slug: 'full-set',
    wide: true,
    items: [
      'Acrylic Full Set',
      'Acrylic Fill-In',
      'Gel Powder Full Set',
      'Gel Powder Fill-In',
      'Gel Powder with Nail Tip',
      'LCN Full Set',
      'LCN Fill-In',
    ],
  },
  {
    category: 'Waxing',
    slug: 'waxing',
    items: ['Brows', 'Lip', 'Chin', 'Cheeks'],
  },
  {
    category: 'Massage',
    slug: 'massage',
    items: ['10 min', '15 min', '20 min'],
  },
  {
    category: 'VIP Spa',
    slug: 'vip-spa',
    center: true,
    items: ['Special(BLC) Spa','Jelly Hot Stone','Butter Honey','Green Tea Spa', 'Silky Milky Spa'],
  },
]
export default function ElegantMenu() {
  const { section } = useParams()
  useEffect(() => {
    if (section) {
      document.getElementById(`cat-${section}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [section])
  return (
    <div className="theme theme-romance">
      <header className="rom-nav">
        <Link className="rom-logo" to="/">La Belle &amp; Nail Spa</Link>
        <nav>
          <Link to="/">← Back home</Link>
          <a
            className="rom-book"
            href="#book"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Book now
          </a>
        </nav>
      </header>
      <section className="rom-hero rom-menu-hero">
        <p className="eyebrow">Everything we offer</p>
        <h1>
          The full <em>menu</em>
        </h1>
        <div className="rom-divider">❦</div>
      </section>
      <section className="section rom-menu">
        <div className="menu-grid">
          {MENU.map(({ category, slug, items, wide, center }) => (
            <div
              className={'menu-cat' + (wide ? ' menu-cat--wide' : '') + (center ? ' menu-cat--center' : '')}
              id={`cat-${slug}`}
              key={category}
            >
              <h3>{category}</h3>
              <div className="menu-items">
                {items.map((name) => (
                  <div className="menu-item menu-item--plain" key={name}>
                    <h4>{name}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="rom-footer" id="book">
      <h2>La Belle &amp; Nail Spa</h2>
        <p>290 New Dorp Ln, Staten Island, NY, 10306 · Open daily 10-7 closed Tuesdays · (718) 887-8183</p>
        <a className="btn-primary" href="tel:+17188878183">Reserve your chair</a>
      </footer>
    </div>
  )
}

