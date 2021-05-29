import React, { useState } from 'react'
import { signup } from '../../../../services/signup'

const SignupForm = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

  const [validationErrors, setValidationErrors] = useState([])

  const handleInput = (e) => {
    e.preventDefault()
    
    // Hacky value.replace thing removes all whitespaces from the input value
    const v = e.target.value.replace(/\s/g, '')
    
    switch(e.target.id){
      case 'signup-username':
        setUsername(v)
        break
      case 'signup-email':
        setEmail(v)
        break
      case 'signup-password':
        setPassword(v)
        break
      case 'signup-password-again':
        setPasswordAgain(v)
        break
      default: break
    }
  }

  const validateForm = () => {
    
    // Push validation errors in errors array.
    // If errors array has any items in it (in the end of the function)
    // there was a problem with the validation.
    // Returns true if validation went ok, false if not.

    const errors = []

    !username
      ? errors.push('username is required')
      : username.length < 5 && errors.push('username has to be at least 5 characters long')

    !email
      ? errors.push('email is required')
      : !email.includes('@') && errors.push('invalid email address')

    !password
      ? errors.push('password is required')
      : password.length < 6 && errors.push('password has to be at leat 6 characters long')

    password !== passwordAgain && errors.push('passwords don\'t match')

    if(errors.length > 0){
      setValidationErrors(errors)
      return false
    } else {
      return true
    }
  }

  const submitForm = async (e) => {
    e.preventDefault()
    if(validateForm()){
      console.log('form ok! submit!')
      const newUser = {
        username: username,
        password: password,
        email: email
      }
      const response = await signup(newUser)
      console.log('response in form: ', response)
      
    } else {
      console.log('form data invalid')
    }
  }

  // Map validation errors, if any
  const validationErrorMessages = validationErrors && validationErrors.map(err => <p>{err}</p>)

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
          type="text"
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
          type="text"
          id="signup-password-again"
          data-testid="signup-password-again"
          name="signup-password-again"
          onChange={handleInput}
          value={passwordAgain}
          />
      </div>

      {validationErrors && validationErrorMessages}

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