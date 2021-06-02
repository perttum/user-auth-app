import React from 'react'

const PasswordForm = ({ handleInput, password, passwordAgain, handleSubmit }) => {
  return(
    <form>
      <div className="input-group">
        <label htmlFor="signup-password">password:</label>
        <input
          type="password"
          id="password"
          data-testid="password"
          name="password"
          onChange={handleInput}
          value={password}
          />
      </div>
      <div className="input-group">
        <label htmlFor="password-again">password again:</label>
        <input
          type="password"
          id="password-again"
          data-testid="password-again"
          name="password-again"
          onChange={handleInput}
          value={passwordAgain}
          />
      </div>
      <button
        id="submit-new-password"
        data-testid="submit-new-password"
        onClick={handleSubmit}
      >
        change password
      </button>
    </form>
  )
}

export default PasswordForm