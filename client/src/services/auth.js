import axios from 'axios'
const baseUrl = '/api/auth'

export const login = async (userToLogin) => {
  try{
    const loggedInUser = await axios.post(baseUrl, userToLogin)
    return loggedInUser.data
  } catch(err){

    // If server is down/crashed, display 'server down' msg.
    // Otherwise display error msg sent from the server
    const response = err.response.status === 500
      ? { error: 'Something troubles server right now. Please try again later.' }
      : { error: err.response.data.error }
    
    return { response }
  }
}