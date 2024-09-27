import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './homepage/home'
export function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
  )
}
