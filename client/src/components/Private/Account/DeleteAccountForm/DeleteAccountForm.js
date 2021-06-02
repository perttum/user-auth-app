import React from 'react'

const DeleteAccountForm = ({ deleteUsername, handleInput, handleSubmit }) => {
  return(
    <form>
      <div className="input-group">
        <label htmlFor="delete-username">
          Insert your username to delete this account
        </label>
        <input
          type="text"
          id="delete-username"
          name="delete-username"
          data-testid="delete-username"
          value={deleteUsername}
          onChange={handleInput}
        />
      </div>
      <button onClick={handleSubmit}>
        I understand what I am doing.
      </button>
    </form>
  )
}

export default DeleteAccountForm