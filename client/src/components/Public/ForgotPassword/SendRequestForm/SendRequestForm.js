import React from 'react'

const SendRequestForm = ({ handleInput, handleSubmit, email }) => {
  return(
    <>
      <h2>Forgot your password?</h2>
      <form>
        <label htmlFor="email">
          Insert the email address you created your accont with
          and I'll send you a reset link 
        </label>
        <input
          type="email"
          id="email"
          data-testid="email"
          name="email"
          value={email}
          onChange={handleInput}
        />
        <button
          onClick={handleSubmit}
          type="button"
        >
          Send reset link
        </button>
      </form>
    </>
  )
}

export default SendRequestForm