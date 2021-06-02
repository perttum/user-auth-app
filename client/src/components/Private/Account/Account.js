import React, { useState, useEffect } from 'react'
import AccountForm from './AccountForm/AccountForm'
import PasswordForm from './PasswordForm/PasswordForm'
import DeleteAccountForm from './DeleteAccountForm/DeleteAccountForm'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../reducers/user'
import { deleteAccount } from '../../../services/account'
import { logoutUser } from '../../../reducers/user'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'

const Account = () => {
  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  // const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

  const [deleteUsername, setDeleteUsername] = useState('')

  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    if(user){
      // setUsername(user.username)
      setEmail(user.email)
    }
  }, [user])


  const handleInput = (e) => {
    e.preventDefault()
    
    // Hacky value.replace thing removes all whitespaces from the input value
    const v = e.target.value.replace(/\s/g, '')
    
    switch(e.target.id){
      case 'email':
        setEmail(v)
        break
      case 'password':
        setPassword(v)
        break
      case 'password-again':
        setPasswordAgain(v)
        break
      case 'delete-username':
        deleteUsername(v)
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

    // !username
    //   ? errors.push('username is required')
    //   : username.length < 5 && errors.push('username has to be at least 5 characters long')

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

  const submitUserInfo = async (e) => {
    e.preventDefault()
    const newUserInfo = {
      email: email,
      id: user.id
    }
    console.log('klik submit user info')
    dispatch(updateUser(user.token, newUserInfo))
  }

  const submitPasswordChange = async (e) => {
    e.preventDefault()
    const newPassword = {
      password: password,
      id: user.id
    }
    dispatch(updateUser(user.token, newPassword))
  }

  const submitDeleteAccount = async (e) => {
    e.preventDefault()
    await deleteAccount(user.token, user.id)
    dispatch(logoutUser())
    // history.push('/')
    
  }

  const submitForm = async (e) => {
    e.preventDefault()
    if(validateForm()){
      console.log('form ok! submit!')
      // const newUser = {
      //   username: username,
      //   password: password,
      //   email: email
      // }
      // const response = await signup(newUser)
      // await signup(newUser)

      // const user = {
      //   username: username,
      //   password: password
      // }
      // dispatch(loginUser(user))
      //   .then(response => {
      //     // If response is undefined there was no error. User logged in.
      //     !response && history.push('/private')
      //   })
      
    } else {
      console.log('form data invalid')
    }
  }
  
  return(
    <div>
      <h1>{user.username}</h1>
      <p>User since: {dayjs(user.userCreated).format('DD.MM.YYYY')}</p>
      
      <div className="card">
        <h2>Update user info</h2>
        <AccountForm
          email={email}
          handleInput={handleInput}
          handleSubmit={submitUserInfo}
        />
      </div>

      <div className="card">
        <h2>Change password</h2>
        <PasswordForm
          password={password}
          passwordAgain={passwordAgain}
          handleInput={handleInput}
          handleSubmit={submitPasswordChange}
        />
      </div>

      <div className="card">
        <h2>Delete account</h2>
        <DeleteAccountForm
          handleInput={handleInput}
          deleteUsername={deleteUsername}
          handleSubmit={submitDeleteAccount}
        />
      </div>
    </div>
  )
}

export default Account