import "./styles.css"
import Home from "./pages/Home"
import DetailedProject from "./pages/DetailedProject"
import AddProject from "./pages/AddProject"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditProject from "./pages/EditProject"



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects/add' element={<AddProject />} />
        <Route path='/projects/details/:id' element={<DetailedProject />} />
        <Route path='/projects/edit/:id' element={<EditProject />} />
      </Routes>
    </Router>

  )
}