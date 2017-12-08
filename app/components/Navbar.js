import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
      <div className="navbar">
        <h2 id="main-title">University of Illinois at Urbana Champaign</h2>
        <NavLink to="/">
          <h2>Home</h2>
        </NavLink>
        <NavLink to="/students">
          <h2>Students</h2>
        </NavLink>
      </div>
  )
}

export default Navbar
