import { login } from '../services/auth'

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
    if(!loggedInUser.error){
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
  return{
    type: 'LOGOUT',
  }
}

export default userReducer