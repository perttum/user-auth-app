import React from 'react'
import { Link } from 'react-router-dom'

const PublicNav = () => {
  return(
    <div>
      <Link to="/">
        Login
      </Link>
      <span> | </span>
      <Link to="/signup">
        Create account
      </Link>
      <span> | </span>
      <Link to="/forgot">
        Forgot password?
      </Link>
    </div>
  )
}

export default PublicNav