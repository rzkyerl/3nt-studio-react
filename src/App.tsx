import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Location from './pages/Location';
import Booking from './pages/Booking';
import Photobooth from './pages/Photobooth';
import AdminDashboard from './pages/Admin/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-pure-white selection:bg-primary-black selection:text-pure-white overflow-x-hidden flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/location" element={<Location />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/photobooth" element={<Photobooth />} />
            
            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
