import React from 'react'
import PrivateNav from './PrivateNav/PrivateNav'
import LogoutButton from './LogoutButton/LogoutButton'
import { Route, Switch } from 'react-router-dom'
import Account from './Account/Account'

// Private page to show after successful login

const Private = () => {
  return(
    <>
      <PrivateNav/>
      <div style={{ marginTop: '80px' }} className="container">
      <Switch>
        <Route exact path="/private/">
          <div className="card">
            <h1>You've been Logged in!</h1>
          </div>
        </Route>
        <Route exact path="/account/">
          <Account/>
        </Route>
      </Switch>
        <LogoutButton/>
      </div>
    </>
  )
}

export default Private