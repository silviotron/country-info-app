import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CountryDetailsPage from './components/CountryDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/countries/:countryName" element={<CountryDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;