import axios from 'axios'
import { tokenizeRequest } from './tokenizeRequest'
const baseUrl = '/private/api/'

export const getAllUsers = async (token) => {
  try{
    const requestConfig = tokenizeRequest(token)
    const allUsers = await axios.get(baseUrl, requestConfig)
    console.log('users found: ', allUsers)
  }catch(err){
    console.log(err)
  }
}