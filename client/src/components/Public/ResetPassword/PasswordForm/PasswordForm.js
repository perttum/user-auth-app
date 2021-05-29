import React from 'react'

const PasswordForm = ({ onSubmit, password, passwordAgain, setPassword, setPasswordAgain }) => {

  return(
    <form onSubmit={ onSubmit }>
      <div className="input-group">
        <label htmlFor="password">Salasana</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value) }
        />
      </div>
      <div className="input-group">
        <label htmlFor="password-again">Salasana uudestaan</label>
        <input
          type="password"
          name="password-again"
          id="password-again"
          value={passwordAgain}
          onChange={(event) => setPasswordAgain(event.target.value) }
        />
      </div>
      <button>Vaihda salasana</button>
    </form>
  )
}

export default PasswordForm