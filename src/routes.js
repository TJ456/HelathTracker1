import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import MentalHealth from './pages/MentalHealth/MentalHealth';
import Diagnostics from './pages/Diagnostics/Diagnostics';
import Telemedicine from './pages/Telemedicine/Telemedicine';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mental-health" element={<MentalHealth />} />
        <Route path="/diagnostics" element={<Diagnostics />} />
        <Route path="/telemedicine" element={<Telemedicine />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;