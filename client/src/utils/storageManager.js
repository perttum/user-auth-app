const setUser = (key, item, ttl) => {
  
  item.expiry = ttl // Time To Live, ie. how long the user stays logged in
  window.localStorage.setItem(key, JSON.stringify(item))
}

const getUser = () => {
  const userFromStorage = window.localStorage.getItem('user-auth-demo')
  if(userFromStorage){
    const now = new Date()
    const itemExpiry = new Date(JSON.parse(userFromStorage).expiry)
    const loggedIn = now > itemExpiry ? false : true
    return loggedIn ? userFromStorage : null
  }
  return null
}

const removeUser = () => {
  window.localStorage.removeItem('user-auth-demo')
}

const storageManager = {
  setUser,
  getUser,
  removeUser
}

export default storageManager