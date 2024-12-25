import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AgeVerification from './pages/AgeVerification';
import EmailInput from './pages/EmailInput';
import OtpVerification from './pages/OtpVerification';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AgeVerification />} />
        <Route path='/email' element={<EmailInput />} />
        <Route path='/otp' element={<OtpVerification />} />
      </Routes>
    </Router>
  )
}

export default App
