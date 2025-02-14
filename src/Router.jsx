import React from 'react'
import Landing from './Pages/Landing/Landing'
import SignUp from './Pages/Auth/SignUp'

function Routing() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<SignUp />} />
            <Route path="/payment" element={<Payment />} />
        </Routes>

    </Router>
  )
}

export default Routing