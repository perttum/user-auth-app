import React from 'react'
import LogoutButton from '../LogoutButton/LogoutButton'

// Private page to show after successful login

const Private = () => {
  return(
    <div>
      <h1>You've been Logged in!</h1>
      <LogoutButton/>
    </div>
  )
}

export default Private