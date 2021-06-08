import React, { useState } from 'react'
import SignupForm from './SignupForm/SignupForm'
import { signup } from '../../../services/signup'
import { loginUser } from '../../../reducers/user'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Signup = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

  const [errors, setErrors] = useState([])

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
      setErrors(errors)
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
      // const response = await signup(newUser)
      const signedUpUser = await signup(newUser)
      console.log('response at Signup component: ', signedUpUser)
      if(signedUpUser.response.error){
        setErrors([signedUpUser.response.error])
      } else {
        const user = {
          username: username,
          password: password
        }
        dispatch(loginUser(user))
          .then(response => {
            // If response is undefined there was no error. User logged in.
            !response && history.push('/private')
          })
      }
    }
  }

  return(
    <div style={{ width:'80%'}}>
      <h1>Signup</h1>
      <SignupForm
          handleInput={handleInput}
          submitForm={submitForm}
          username={username}
          email={email}
          password={password}
          passwordAgain={passwordAgain}
          errors={errors}
        />
    </div>
  )
}

export default Signup