import React from 'react'
import PrivateNav from './PrivateNav/PrivateNav'
import LogoutButton from './LogoutButton/LogoutButton'
import { Route, Switch } from 'react-router-dom'
import WellcomeNewUser from './WellcomeNewUser/WellcomeNewUser'

// Private page to show after successful login

const Private = () => {
  return(
    <div style={{ marginTop: '80px' }} className="container">
    <Switch>
      <Route exact path="/private/">
        <h1>You've been Logged in!</h1>
      </Route>
      <Route exact path="/wellcome/">
        <WellcomeNewUser/>
      </Route>
    </Switch>
    <PrivateNav/>
      <LogoutButton/>
    </div>
  )
}

export default Private