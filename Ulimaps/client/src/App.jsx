// archivo App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeInterface from './views/welcome.jsx';
import LoginInterface from './views/logging.jsx';
import MapInterface from './views/map.jsx';
import CrudInterface from './views/crud.jsx';

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
  );
}

export default App;

