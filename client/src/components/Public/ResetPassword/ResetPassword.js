import React, { useState, useEffect } from 'react'
import { getResetToken, resetPassword } from '../../../services/passwordReset'
import { Link } from 'react-router-dom'
import PasswordForm from './PasswordForm/PasswordForm'

const ResetPassword = () => {

  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [tokenFound, setTokenFound] = useState(null)
  const [message, setMessage] = useState(null)
  const [passwordReseted, setPasswordReseted] = useState(false)

  useEffect(() => {
    const foundToken = async () => {
      const token = new URLSearchParams(window.location.search).get('token')
      const result = await getResetToken(token)
      setTokenFound(result)
    }
    foundToken()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(validateForm()){
      const token = new URLSearchParams(window.location.search).get('token')
      await resetPassword(token, password)
      setPassword('')
      setPasswordAgain('')
      setPasswordReseted(true)
      // console.log('Password updated ok!')
    }
  }

  const passwordResetConfirmation = <div>
    <h3>Salasanasi on vaihdettu</h3>
    <p>Voit nyt <Link to="/">kirjautua</Link> uudella salasanallasi sisään</p>
  </div>

  const validateForm = () => {
    let validated = true
    let msg = []
    if(password.length < 4){
      validated = false
      if(msg.find(m => m === 'salasana liian lyhyt (min. 4 merkkiä)') === undefined){
        msg.push('salasana liian lyhyt (min. 4 merkkiä)')
      }
    }
    if(passwordAgain.length < 4){
      validated = false
      if(msg.find(m => m === 'salasana liian lyhyt (min. 4 merkkiä)') === undefined){
        msg.push('salasana liian lyhyt (min. 4 merkkiä)')
      }
    }
    if(password !== passwordAgain){
      validated = false
      msg.push('salasanat eivät täsmää')
    }

    const errors = msg.map(m => <li key={Math.floor(Math.random() * 100000)}>{m}</li>)
    setMessage(<ul>{errors}</ul>)

    return validated
  }

  return(
    <>
      <div className="container">
        {!passwordReseted ?
          tokenFound
            ?
            <div>
              <h1>Vaihda salasanaa</h1>
              <PasswordForm
                onSubmit={handleSubmit}
                setPassword={setPassword}
                setPasswordAgain={setPasswordAgain}
                password={password}
                passwordAgain={passwordAgain}
              />
              {message}

            </div>
            :
            <div>
              <p>
            Salasanan vaihtopyyntö on vanhentunut. Ole hyvä ja yritä uudestaan.
              </p>
              <Link to='/forgot'>
                <p>Nollaa salasana</p>
              </Link>
            </div>

          : passwordResetConfirmation
        }
        <Link to='/'>
          <p>Kirjaudu sisään</p>
        </Link>
      </div>
    </>
  )
}

export default ResetPassword