import axios from 'axios'
const baseUrl = '/api/example'

const getShouts = async () => {
  try{
    const response = await axios.get(baseUrl)
    console.log('response in getShouts service: ', response.data)
    return response.data
  } catch(err){
    console.log('error at getExampleData: ', err)
  }
}

const createShout = async (shout) => {
  try{
    const response = await axios.post(baseUrl, shout)
    console.log('response in createShout service: ', response)
  } catch(err){
    console.log(err)
  }
}

const exports = {
  getShouts,
  createShout
}

export default exports