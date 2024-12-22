import { Routes, Route } from "react-router-dom"
import './App.css'
import AmazonStyleCart from "./components/AmazonStyleCart"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<WhishList />}/>
        <Route path="/cart" element={<AmazonStyleCart />} />
      </Routes>
    </>
  )
}

export default App
