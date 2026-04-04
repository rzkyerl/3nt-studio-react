import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Location from './pages/Location';
import Photobooth from './pages/Photobooth';
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
            <Route path="/photobooth" element={<Photobooth />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
