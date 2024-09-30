import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Practice, Shop, Learn } from './dashboard/pages/index'
import {
  Unit1,
  Unit2,
  Unit3,
  Unit4,
  Unit0,
} from './dashboard/lessons/fundamentals/index'
import Layout from './dashboard/layout/Layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Learn />} />
          <Route path='practice' element={<Practice />} />
          <Route path='shop' element={<Shop />} />
        </Route>
        <Route path='/fundamentals/introduction' element={<Unit0 />} />
        <Route path='/fundamentals/variables' element={<Unit1 />} />
        <Route path='/fundamentals/arithematics' element={<Unit2 />} />
        <Route path='/fundamentals/conditionals' element={<Unit3 />} />
        <Route path='/fundamentals/loops' element={<Unit4 />} />
      </Routes>
    </Router>
  )
}

export default App
