import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Practice, Shop, Learn } from './dashboard/pages/index'
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
      </Routes>
    </Router>
  )
}

export default App
