import { login } from '../services/auth'
import { updateUserData } from '../services/account'
import storageManager from '../utils/storageManager'
import dayjs from 'dayjs'

const userReducer = (state = null, action) => {
  switch(action.type){
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT':
      return null
    default: return state
  }
}

export const loginUser = (userToLogin) => {
  
  return async dispatch => {
    const loggedInUser = await login(userToLogin)

    if(loggedInUser && !loggedInUser.error){

      // Set user to browsers localstorage (so user stays logged in on refresh)
      // Change dayjs time to set how long users stays logged in
      const now = new Date()
      storageManager.setUser('user-auth-demo', loggedInUser, dayjs(now).add(5, 'minute'))

      dispatch({
        type: 'LOGIN_USER',
        data: loggedInUser
      })
    } else {
      return loggedInUser
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
    type: 'LOGIN_USER',
    data: user
  }
}

// Update user
export const updateUser = (token, user) => {
  return async dispatch => {
    const updatedUser = await updateUserData(token, user)
    console.log('updated user in reucer: ', updatedUser)
    
    dispatch({
      type: 'LOGIN_USER',
      data: updatedUser
    })
  }
}

export default userReducer