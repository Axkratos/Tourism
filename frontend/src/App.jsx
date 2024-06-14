import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { Navbar } from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './components/Home/Home'
import Dash from './components/dashboard/dash'

// import Navbar from './components/common/Navbar.jsx'
// import Footer from './components/common/Footer.jsx'

function App() {


  return (
    <>
      <Navbar/>
      <Footer/>
    </>
  )
}

export default App
