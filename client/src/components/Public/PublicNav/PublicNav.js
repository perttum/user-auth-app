import React from 'react'
import { Link } from 'react-router-dom'

const PublicNav = () => {
  return(
    <div id="public-nav">
      <div className="public-nav-link">
        <Link to="/">
          <span>
            Login
          </span>
        </Link>
      </div>
      <div className="public-nav-link">
        <Link to="/signup">
          <span>
            Create account
          </span>
        </Link>
      </div>
      <div className="public-nav-link">
        <Link to="/forgot">
          <span>
            Forgot password?
          </span>
        </Link>
      </div>
    </div>
  )
}

export default PublicNav