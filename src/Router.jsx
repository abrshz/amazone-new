import React from 'react'
import {BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Landing from './Pages/Landing/Landing'
import SignUp from './Pages/Auth/SignUp'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Card from './Pages/Card/Card'

function Routing() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<SignUp />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/card" element={<Card />} />            
        </Routes>

    </Router>
  )
}

export default Routing