import React, { useState } from 'react'
import LoginForm from './LoginForm/LoginForm'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../reducers/user'
import { useHistory } from 'react-router-dom'

const Login = () => {
  
  const dispatch = useDispatch()
  const history = useHistory()
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [error, setError] = useState(null)

  const submitLogin = async (e) => {
    e.preventDefault()
    const user = {
      username: usernameInput,
      password: passwordInput
    }
    dispatch(loginUser(user))
      .then(response => {
        // If response is undefined there was no error. User logged in.
        response ? setError(response.error) : history.push('/private')
      })
  }

  const handleInput = (e) => {
    e.preventDefault()
    console.log('e id: ', e.target.id)
    
    switch(e.target.id){
    case 'login-username':
      setUsernameInput(e.target.value)
      break
    case 'login-password':
      setPasswordInput(e.target.value)
      break
    default: break
    }
  }
  
  return(
    <div id="login" style={{ minWidth:'50%'}}>
      <h1>Login</h1>
      { error && <p>{error}</p>}
      <LoginForm handleInput={handleInput} handleSubmit={submitLogin}/>
    </div>
  )
}

export default Login