import React from 'react'
import { Link, Redirect } from 'react-router-dom'

const Header = () => (
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
    <div className='container'>
      <Link className='navbar-brand' to='/'>To-do list</Link>

    </div>
  </nav>
)

export default Header