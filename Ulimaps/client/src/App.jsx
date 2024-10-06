// archivo App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD:Ulimaps/src/views/App.tsx
import WelcomeInterface from './welcome.tsx';
import LoginInterface from './login.tsx';
import MapInterface from './map.tsx';
import CrudInterface from './crud.tsx';
import OriginInterface from './origin.tsx';
=======
import WelcomeInterface from './views/welcome.jsx';
import LoginInterface from './views/logging.jsx';
import MapInterface from './views/map.jsx';
import CrudInterface from './views/crud.jsx';
>>>>>>> 5c481509a0773a4fa023dfd6629a9fbb0b5440fc:Ulimaps/client/src/App.jsx

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomeInterface />} />
          <Route path="/login" element={<LoginInterface />} />
          <Route path="/map" element={<MapInterface />} />
          <Route path="/crud" element={<CrudInterface />} />
          <Route path='/origin' element={<OriginInterface />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

