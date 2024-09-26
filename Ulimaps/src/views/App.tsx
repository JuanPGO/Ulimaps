import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeInterface from './welcome.tsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomeInterface />} />
          
        </Routes>
      </div>
    </Router>
  )
}

export default App
