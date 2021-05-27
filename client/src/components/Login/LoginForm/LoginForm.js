import React from 'react'

const LoginForm = ({ handleInput, handleSubmit }) => {
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
          onChange={handleInput}
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
          onChange={handleInput}
        />
      </div>
      <button
        onClick={handleSubmit}
      >
        login
      </button>
    </form>
  )
}

export default LoginForm