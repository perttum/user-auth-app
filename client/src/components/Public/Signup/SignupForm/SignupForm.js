import React from 'react'

const SignupForm = ({ handleInput, submitForm, username, email, password, passwordAgain, errors }) => {

  // Map validation errors, if any
  const errorMessages = errors && errors.map(err => <p key={err}>{err}</p>)

  return(
    <form>
      <div className="input-group">
        <label htmlFor="signup-username">username:</label>
        <input
          type="text"
          id="signup-username"
          data-testid="signup-username"
          name="signup-username"
          onChange={handleInput}
          value={username}
          />
      </div>
      <div className="input-group">
        <label htmlFor="signup-email">email:</label>
        <input
          type="email"
          id="signup-email"
          data-testid="signup-email"
          name="signup-email"
          onChange={handleInput}
          value={email}
          />
      </div>
      <div className="input-group">
        <label htmlFor="signup-password">password:</label>
        <input
          type="password"
          id="signup-password"
          data-testid="signup-password"
          name="signup-password"
          onChange={handleInput}
          value={password}
          />
      </div>
      <div className="input-group">
        <label htmlFor="signup-password-again">password again:</label>
        <input
          type="password"
          id="signup-password-again"
          data-testid="signup-password-again"
          name="signup-password-again"
          onChange={handleInput}
          value={passwordAgain}
          />
      </div>

      {errors && errorMessages}

      <button
        id="submit-signup-button"
        data-testid="submit-signup-button"
        onClick={submitForm}
      >
        signup
      </button>
    </form>
  )
}

export default SignupForm