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

export const getResetToken = async (token) => {
  try{
    const response = await axios.get(baseUrl + `/reset?token=${token}`)
    // console.log('response ', response.status)
    return response.status === 200 ? true : false

  } catch(err){
    console.log('Error at getResetToken() ', err)
    return false
  }
}

export const resetPassword = async (token, password) => {
  try{
    const pass = {
      password: password
    }
    await axios.post(baseUrl + '/reset/' + token, pass)
  } catch(err){
    console.log('Error at resetPassword() ', err)
  }
}

// Takes in an email addres as param. Sends password reset email.
export const requestPasswordReset = async (email) => {
  try{
    const mail = {
      email: email
    }
    const response = await axios.post(baseUrl + '/forgot', mail)
    // console.log('response ', response.status)
    return response.status === 200 ? true : false

  } catch(err){
    console.log('User not found at resetPassword() ', err)
    return false

  }
}