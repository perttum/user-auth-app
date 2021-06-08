const initialState = {
  show: false,
  title: 'Hey!',
  message: 'There.'
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
      
    case 'HIDE_NOTIFICATION':
      return initialState

    default: return state
  }
}

let timeOut
const delay = 10000
export const setNotification = (title, message) => {

  
  return async dispatch => {
    const notification = {
      show: true,
      title: title,
      message: message
    }
    
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: notification
    })

    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, delay)
  }
}

export const hideNotification = () => {
  clearTimeout(timeOut)
  return{
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer