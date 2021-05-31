import React from 'react'
import { Link } from 'react-router-dom'

const PrivateNav = () => {
  return(
    <div id="private-nav">
      <Link to="/private">
        Home
      </Link>
      <Link to="/private/account">
        Account
      </Link>
      <Link to="/">
        Logout
      </Link>
    </div>
  )
}

export default PrivateNav