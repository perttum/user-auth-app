import React from 'react'
import Signup from './Signup/Signup'
import Login from './Login/Login'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import ResetPassword from './ResetPassword/ResetPassword'
import PublicNav from './PublicNav/PublicNav'
import { Route, Switch } from 'react-router-dom'

// All the public routes/components go here

const Public = () => {
  return(
    <div id="public-container">
    <Switch>
      <Route path="/signup" exact>
        <Signup/>
      </Route>
      <Route path="/forgot" exact>
        <ForgotPassword/>
      </Route>
      <Route path="/reset" >
        <ResetPassword/>
      </Route>
      <Route path="/">
        <Login/>
      </Route>
    </Switch>
    <PublicNav/>
    </div>
  )
}

export default Public