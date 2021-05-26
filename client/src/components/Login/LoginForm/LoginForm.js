import React from 'react'
import Login from '../Login'

const LoginForm = () => {
  return(
    <form>
      <div className="input-group">
        <label htmlFor="login-username">
          username:
        </label>
        <input
          type="text"
          id="login-username"
          name="login-username"
          data-testid="login-username"
        />
      </div>
      <div className="input-group">
        <label htmlFor="login-password">
          password:
        </label>
        <input
          type="password"
          id="login-password"
          name="login-password"
          data-testid="login-password"
        />
      </div>
      <button>
        login
      </button>
    </form>
  )
}

export default LoginForm