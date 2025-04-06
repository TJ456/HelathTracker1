import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import MentalHealth from './components/mental-health/MentalHealth';
import Diagnostics from './pages/Diagnostics/Diagnostics';
import Telemedicine from './pages/Telemedicine/Telemedicine';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import Chatbot from './components/common/Chatbot/Chatbot'; // Import the Chatbot component
import SkinAnalysis from './components/diagnostics/SkinAnalysis/SkinAnalysis';

// Layout Component to wrap Navbar, Footer, and Chatbot around the main content
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
      <Chatbot /> {/* Add the Chatbot here */}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* Mental Health Route */}
        <Route
          path="/mental-health"
          element={
            <Layout>
              <MentalHealth />
            </Layout>
          }
        />

        {/* Diagnostics Route */}
        <Route
          path="/diagnostics"
          element={
            <Layout>
              <Diagnostics />
            </Layout>
          }
        />

        {/* Skin Analysis Route */}
        <Route
          path="/diagnostics/skin-analysis"
          element={
            <Layout>
              <SkinAnalysis />
            </Layout>
          }
        />

        {/* Telemedicine Route */}
        <Route
          path="/telemedicine"
          element={
            <Layout>
              <Telemedicine />
            </Layout>
          }
        />

        {/* Profile Route */}
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        {/* 404 Not Found Route */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;