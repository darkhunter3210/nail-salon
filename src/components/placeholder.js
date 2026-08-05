// Generates pretty gradient SVG placeholders so the gallery looks good
// before the owner uploads real photos.
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";
import image5 from "../assets/image5.jpeg";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import image8 from "../assets/image8.jpeg";
import image9 from "../assets/image9.jpeg";

function svgDataUri(from, to, label, deco) {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="640" height="800" fill="url(#g)"/>
  ${deco}
  <text x="320" y="720" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="rgba(90,50,60,0.75)" font-style="italic">${label}</text>
</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const drops = (color) =>
  Array.from({ length: 5 })
    .map((_, i) => {
      const x = 120 + i * 100
      const y = 220 + (i % 2) * 90
      return `<ellipse cx="${x}" cy="${y}" rx="34" ry="46" fill="${color}" opacity="0.55"/>`
    })
    .join('')

export const DEFAULT_GALLERY = [
  { src: image1, caption: "Image 1" },
  { src: image2, caption: "Image 2" },
  { src: image3, caption: "Image 3" },
  { src: image4, caption: "Image 4" },
  { src: image5, caption: "Image 5" },
  { src: image6, caption: "Image 6" },
  { src: image7, caption: "Image 7" },
  { src: image8, caption: "Image 8" },
  { src: image9, caption: "Image 9" },
]
