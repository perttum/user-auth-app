import axios from 'axios'
import { tokenizeRequest } from './tokenizeRequest'
const baseUrl = '/api/private/account'

// Update user info or password
export const updateUserData = async (token, userData) => {
  try{
    const config = tokenizeRequest(token)
    const updatedUser = await axios.put(`${baseUrl}/${userData.id}`, userData, config)
    console.log('updated user: ', updatedUser.data)
    return updatedUser.data
    
  } catch(err){
    console.log('Error at updateUser service: ', err)
  }
}

// Delete account
export const deleteAccount = async (token, userId) => {
  try{
    const config = tokenizeRequest(token)
    await axios.delete(`${baseUrl}/${userId}`, config)
    return true
  } catch(err){
    console.log('Error at deleteAccount service: ', err)
    return false
  }
}
