import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeInterface from './welcome.tsx';
import LoginInterface from './login.tsx';
import MapInterface from './map.tsx';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomeInterface />} />
          <Route path="/login" element={<LoginInterface />} />
          <Route path="/map" element={<MapInterface />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
