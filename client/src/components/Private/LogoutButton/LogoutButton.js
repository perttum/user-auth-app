import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../reducers/user'

const LogoutButton = () => {
  
  const dispatch = useDispatch()

  const onClick = (e) => {
    e.preventDefault()
    console.log('logout')
    dispatch(logoutUser())
  }
  
  return(
    <button
      id="logout-button"
      data-testid="logout-button"
      onClick={onClick}
    >
      logout
    </button>
  )
}

export default LogoutButton