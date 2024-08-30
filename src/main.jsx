import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './component/form';
import Login from './component/Login'
import ProfilePage from './component/Profile';

const Main = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/login" element={< Login/>} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  </Router>
  )
}

export default Main
