import axios from 'axios'
const baseUrl = '/api/signup'

export const signup = async (user) => {
  try{
    const response = await axios.post(baseUrl, user)
    console.log('response @ signup: ', response)
    
  } catch(err) {
    console.log(err.response)
    // If server is down/crashed, display 'server down' msg.
    // Otherwise display error msg sent from the server
    const response = err.response.status === 500
      ? { error: 'Something troubles server right now. Please try again later.' }
      : { error: err.response.data.error }
    
    return { response }
    
  }
}