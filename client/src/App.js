import React, { useEffect } from 'react'
import Private from './components/Private/Private'
import Public from './components/Public/Public'
import Notificator from './components/common/Notificator/Notificator'
import { useDispatch, useSelector } from 'react-redux'
import storageManager from './utils/storageManager'
import { reLoginUser, logoutUser } from './reducers/user'
import './sass/app.scss'

function App() {

  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  // Check if user is already logged in
  useEffect(() => {
    
    const userFromStorage = storageManager.getUser()
    // console.log('userFromStorage type in app: ', typeof userFromStorage)
    // console.log('userFromStorage in app: ', userFromStorage)
    
    if(!user){
      if(userFromStorage){
        const jsonUser = JSON.parse(userFromStorage)
        
        dispatch(reLoginUser(jsonUser))
      } else {
        dispatch(logoutUser())
      }
    } else {
      (!userFromStorage && user) && dispatch(logoutUser())
    }
  },[user, dispatch])

  return (
    <>
      { (notification && notification.show) && <Notificator title={notification.title} message={notification.message}/> }
      <div>
        { !user ? <Public/> : <Private/>}
      </div>
    </>
  )
}

export default App;
