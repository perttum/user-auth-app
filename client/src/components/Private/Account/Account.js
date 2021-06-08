import React, { useState, useEffect } from 'react'
import AccountForm from './AccountForm/AccountForm'
import PasswordForm from './PasswordForm/PasswordForm'
import DeleteAccountForm from './DeleteAccountForm/DeleteAccountForm'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../reducers/user'
import { deleteAccount } from '../../../services/account'
import { logoutUser } from '../../../reducers/user'
import { setNotification } from '../../../reducers/notification'
import dayjs from 'dayjs'

const Account = () => {
  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  // const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [emailErrors, setEmailErrors] = useState([])
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [passwordErrors, setPasswordErrors] = useState([])

  const [deleteUsername, setDeleteUsername] = useState('')
  const [deleteUsernameError, setDeleteUsernameError] = useState('')

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
        setDeleteUsername(v)
        break
      default: break
    }
  }

  const submitUserInfo = async (e) => {
    e.preventDefault()
    if(validateEmail(email)){
      
      const newUserInfo = {
        email: email,
        id: user.id
      }
    
      dispatch(updateUser(user.token, newUserInfo))
        .then(response => {
          response === 200
            ? dispatch(setNotification('User updated', 'Everything went just fine!'))
            : dispatch(setNotification('Ungh...', 'Something went wrong.'))
        })
      
    }
  }

  const validateEmail = (email) => {
    
    const errors = []

    !email
      ? errors.push('email is required')
      : (!email.includes('@') || !email.includes('.')) && errors.push('invalid email address')
    

    if(errors.length > 0){
      setEmailErrors(errors)
      return false
    } else {
      emailErrors.length > 0 && setEmailErrors([])
      return true
    }
  }

  const submitPasswordChange = async (e) => {
    e.preventDefault()
    if(validatePassword(password, passwordAgain)){
      const newPassword = {
        password: password,
        id: user.id
      }
      dispatch(updateUser(user.token, newPassword))
        .then(response => {
          console.log('response @ update password: ', response)
          if(response === 200){
            dispatch(setNotification('Password updated', 'Everything went just fine!'))
          } else {
            dispatch(setNotification('Ungh...', 'Something went wrong.'))
          }
      })
    }
  }

  const validatePassword = (password, passwordAgain) => {
    
    const errors = []

    !password || !passwordAgain
    ? errors.push('Please fill both passwords fields.')
    : password !== passwordAgain
      ? errors.push('Passwords don\'t match.')
      : password.length < 6 && errors.push('Password has to be at least 6 characters long.')

    if(errors.length > 0){
      setPasswordErrors(errors)
      return false
    } else{
      passwordErrors.length > 0 && setPasswordErrors([])
      return true
    }
  }

  const submitDeleteAccount = async (e) => {
    e.preventDefault()
    if(validateDeleteUsername(deleteUsername)){
      await deleteAccount(user.token, user.id)
      dispatch(logoutUser())
      dispatch(setNotification('Good bye', 'Good to see you go.'))
    }
  }

  const validateDeleteUsername = (username) => {
    if(username !== user.username){
      setDeleteUsernameError('Incorrect username.')
      return false
    } else{
      deleteUsernameError && setDeleteUsernameError('')
      return true
    }
  }
  
  return(
    <div>
      <h1>{user.username}</h1>
      <p>User since: {dayjs(user.userCreated).format('DD.MM.YYYY')}</p>
      
      <div className="card">
        <h2>Update user info</h2>
        { emailErrors.length > 0
          && emailErrors.map(e => <p key={e}>{e}</p>)
        }
        <AccountForm
          email={email}
          handleInput={handleInput}
          handleSubmit={submitUserInfo}
        />
      </div>

      <div className="card">
        <h2>Change password</h2>
        { passwordErrors.length > 0
          && passwordErrors.map(e => <p key={e}>{e}</p>)
        }
        <PasswordForm
          password={password}
          passwordAgain={passwordAgain}
          handleInput={handleInput}
          handleSubmit={submitPasswordChange}
        />
      </div>

      <div className="card">
        <h2>Delete account</h2>
        { deleteUsernameError && <p>{deleteUsernameError}</p>}
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