import {Routes, Route} from 'react-router-dom'
import Elegant from './variants/Elegant.jsx'
import ElegantMenu from './variants/ElegantMenu.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Elegant/>} />
      <Route path="/menu" element={<ElegantMenu/>} />
      <Route path="/menu/:section" element={<ElegantMenu />} />
    </Routes>
  )
}