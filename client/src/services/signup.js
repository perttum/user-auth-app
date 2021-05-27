import axios from 'axios'
const baseUrl = '/api/signup'

export const signup = async (user) => {
  try{
    const response = await axios.post(baseUrl, user)
    console.log('response')
    
  } catch(err) {
    console.log(err)
    
  }
}