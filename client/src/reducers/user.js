import { login } from '../services/auth'
import { updateUserData } from '../services/account'
import storageManager from '../utils/storageManager'
import dayjs from 'dayjs'

const userReducer = (state = null, action) => {
  switch(action.type){
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null
    default: return state
  }
}

export const loginUser = (userToLogin) => {
  
  return async dispatch => {
    const response = await login(userToLogin)
    
    if(response.username && !response.error){

      // Set user to browsers localstorage (so user stays logged in on refresh)
      // Change dayjs time to set how long users stays logged in
      const now = new Date()
      storageManager.setUser('user-auth-demo', response, dayjs(now).add(5, 'minute'))

      dispatch({
        type: 'SET_USER',
        data: response
      })
    } else {
      return {error: response.response.error}
    }
  }
}

export const logoutUser = () => {
  storageManager.removeUser()
  return{
    type: 'LOGOUT',
  }
}

// Use this when logged user returns to app or refreshes the page
export const reLoginUser = (user) => {
  return{
    type: 'SET_USER',
    data: user
  }
}

// Update user
export const updateUser = (token, user) => {
  return async dispatch => {
    const updatedUser = await updateUserData(token, user)
    if(updatedUser){
      const now = new Date()
      storageManager.setUser('user-auth-demo', updatedUser, dayjs(now).add(5, 'minute'))
      dispatch({
        type: 'SET_USER',
        data: updatedUser
      })
      console.log('hello')
      return 200
      
    } else {
      return null
    }
  }
}

export default userReducer