import { useState } from 'react'
import { DEFAULT_GALLERY } from './placeholder.js'

export default function GalleryCarousel() {
  const [slides] = useState(DEFAULT_GALLERY)
  const [idx, setIdx] = useState(0)

  const go = (d) => setIdx((i) => (i + d + slides.length) % slides.length)

  return (
    <div className="carousel">
      <div className="car-stage">
        <button className="car-arrow left" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
        <div className="car-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {slides.map((s, i) => (
            <figure className="car-slide" key={i}>
              <img src={s.src} alt={s.caption} />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
        <button className="car-arrow right" onClick={() => go(1)} aria-label="Next photo">›</button>
      </div>

      <div className="car-dots">
        {slides.map((_, i) => (
          <button key={i} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)} aria-label={`Go to photo ${i + 1}`} />
        ))}
      </div>

      <div className="car-thumbs">
        {slides.map((s, i) => (
          <button key={i} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>
            <img src={s.src} alt="" />
          </button>
        ))}
      </div>
    </div>
  )
}
