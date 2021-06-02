import React from 'react'

const AccountForm = ({ email, handleInput, handleSubmit }) => {
  return(
    <form>
      <div className="input-group">
        <label htmlFor="email">email:</label>
        <input
          type="email"
          id="email"
          data-testid="email"
          value={email}
          onChange={handleInput}
          name="email"
        />
      </div>
      <button
        id="submit-user-info-update"
        data-testid="submit-user-info-update"
        onClick={handleSubmit}
      >
        save
      </button>
    </form>
  )
}

export default AccountForm