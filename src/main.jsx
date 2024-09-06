import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './component/form';
import Login from './component/Login'
import ProfilePage from './component/Profile';
import Home from './component/Home';

const Main = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/form' element={<Form/>}/>
      <Route path="/login" element={< Login/>} />
      <Route path='/home' element={<Home/>}/>
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  </Router>
  )
}

export default Main
