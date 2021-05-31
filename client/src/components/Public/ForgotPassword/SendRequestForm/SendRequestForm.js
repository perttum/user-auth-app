import React from 'react'

const SendRequestForm = ({ handleInput, handleSubmit, email }) => {
  return(
    <div>
      <h1>Forgot your password?</h1>
      <form>
        <div className="input-group">
          <label htmlFor="email">
            Insert your email address for reset link
          </label>
          <input
            type="email"
            id="email"
            data-testid="email"
            name="email"
            value={email}
            onChange={handleInput}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="button"
        >
          Send reset link
        </button>
      </form>
    </div>
  )
}

export default SendRequestForm