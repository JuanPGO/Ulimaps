import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeInterface from './welcome.tsx';
import LoginInterface from './login.tsx';
import MapInterface from './map.tsx';
import CrudInterface from './crud.tsx';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomeInterface />} />
          <Route path="/login" element={<LoginInterface />} />
          <Route path="/map" element={<MapInterface />} />
          <Route path="/crud" element={<CrudInterface />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
