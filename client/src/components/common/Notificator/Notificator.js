import React from 'react'
import { useDispatch } from 'react-redux'
import { hideNotification } from '../../../reducers/notification'

const Notificator = ({ title, message }) => {
  
  const dispatch = useDispatch()

  const handleOkButton = (e) => {
    e.preventDefault()
    dispatch(hideNotification())
  }
  
  return(
    <div id="notification">
      <div id="notification-box">
        <h3>{title}</h3>
        <p>
          {message}
        </p>
        <button
          id="notification-close-button"
          onClick={handleOkButton}
        >
            OK
        </button>
      </div>
    </div>
  )
}

export default Notificator