import React, { useState } from 'react'
import { requestPasswordReset } from '../../../services/passwordReset'
import SendRequestForm from './SendRequestForm/SendRequestForm'
import RequestSuccess from './RequestSuccess/RequestSuccess'

const ForgotPassword = () => {

  const [requestSent, setRequestSent] = useState(false)
  const [email, setEmail] = useState('')

  const handleInput = (e) => {
    e.preventDefault()

    // Hacky looking value.replace -thing removes all whitespaces from the input value
    setEmail(e.target.value.replace(/\s/g, ''))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await requestPasswordReset(email)
    response && setRequestSent(true)
  }
  
  return(
    <div>
      {!requestSent
        ?
        <SendRequestForm
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          email={email}
        />
        :
        <RequestSuccess/>
      }

    </div>
  )
}

export default ForgotPassword