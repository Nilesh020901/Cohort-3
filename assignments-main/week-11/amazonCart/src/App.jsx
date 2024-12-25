import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AmazonStyleCart, WishList } from "./components"
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WishList />} />
          <Route path="/cart" element={<AmazonStyleCart />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
