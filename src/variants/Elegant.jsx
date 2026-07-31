import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GalleryCarousel from '../components/GalleryCarousel.jsx'
import NailStudio from '../components/NailStudio.jsx'

const scrollTo = (id) => (e) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({behavior: 'smooth'})
}

const CATEGORIES = [
  ['Manicure', 'manicure'],
  ['Pedicure', 'pedicure'],
  ['Full Set & Fill-Ins', 'full-set'],
  ['Waxing', 'waxing'],
  ['Massage', 'massage'],
  ['VIP Spa', 'vip-spa'],
]
export default function Elegant() {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  
  return (
    <div className="theme theme-romance">
      <header className="rom-nav">
        <Link className="rom-logo" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          La Bella &amp; Nail Spa
        </Link>
        <nav>
          <a href="#gallery" onClick={scrollTo('gallery')}>Gallery</a>
          <a href="#tryon" onClick={scrollTo('tryon')}>Try-On</a>
          <a href="#services" onClick={scrollTo('services')}>Services</a>
          <Link to="/menu">Full Menu</Link>
          <a className="rom-book" href="#book">Book now</a>
        </nav>
      </header>
      <section className="rom-hero">
      <div className="rom-hero-deco" aria-hidden="true">
          <span className="petal" style={{ left: '8%', top: '18%', transform: 'rotate(-24deg)' }} />
          <span className="petal" style={{ left: '16%', top: '58%', transform: 'rotate(38deg) scale(0.7)', animationDelay: '1.2s' }} />
          <span className="petal" style={{ left: '26%', top: '30%', transform: 'rotate(80deg) scale(0.5)', animationDelay: '2.4s' }} />
          <span className="petal" style={{ right: '9%', top: '24%', transform: 'rotate(20deg)', animationDelay: '0.6s' }} />
          <span className="petal" style={{ right: '18%', top: '62%', transform: 'rotate(-46deg) scale(0.8)', animationDelay: '1.8s' }} />
          <span className="petal" style={{ right: '27%', top: '38%', transform: 'rotate(60deg) scale(0.55)', animationDelay: '3s' }} />
          <span className="spark" style={{ left: '21%', top: '20%' }}>✦</span>
          <span className="spark" style={{ right: '23%', top: '52%', animationDelay: '1.1s' }}>✦</span>
          <span className="spark" style={{ right: '12%', top: '14%', animationDelay: '2.2s' }}>✦</span>
          <span className="spark" style={{ left: '12%', top: '70%', animationDelay: '1.6s' }}>✦</span>
        </div>
        <p className="eyebrow">Nail Atelier · Est. 2007</p>
        <h1>
          Beauty at your
          <br />
          <em>fingertips</em>
        </h1>
        <p className="rom-sub">
          A quiet pink-and-cream studio where every set is hand-finished, one nail at a time.
        </p>
        <div className="rom-hero-actions">
          <a className="btn-primary" href="#tryon" onClick={scrollTo('tryon')}>Try a colour on</a>
          <a className="btn-ghost" href="#gallery" onClick={scrollTo('gallery')}>See our work</a>
        </div>
        <div className="rom-divider">❦</div>
      </section>
      <section className="section" id="gallery">
        <p className="eyebrow">Portfolio</p>
        <h2>Recent sets we adore</h2>
        <GalleryCarousel />
      </section>
      <section className="section" id="tryon">
        <p className="eyebrow">Virtual mirror</p>
        <h2>Try it on before you book</h2>
        <NailStudio />
      </section>
      <section className="section" id="services">
        <p className="eyebrow">Menu</p>
        <h2>Services</h2>
        <div className="rom-services">
          {CATEGORIES.map(([title, slug]) => (
            <Link className="rom-card rom-card--link" to={`/menu/${slug}`} key={slug}>
              <h3>{title}</h3>
              <span>View services →</span>
            </Link>
          ))}
        </div>
        <Link className="btn-ghost rom-menu-link" to="/menu">View the full menu →</Link>
      </section>
      <footer className="rom-footer" id="book">
        <h2>La Bella &amp; Nail Spa</h2>
        <p>290 New Dorp Ln, Staten Island, NY, 10306 · Open daily 10-7 closed Tuesdays · (718) 887-8183</p>
        <a className="btn-primary" href="tel:+17188878183">Reserve your chair</a>
      </footer>
    </div>
  )
}

