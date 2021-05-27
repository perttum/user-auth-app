import axios from 'axios'
const baseUrl = '/api/auth'

export const login = async (userToLogin) => {
  try{
    console.log('login service logged in: ', userToLogin)
    const loggedInUser = await axios.post(baseUrl, userToLogin)
    return loggedInUser.data
  } catch(err){
    console.log('error response at service', err.response.data)
    return err.response.data
  }
}