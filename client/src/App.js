import './App.css'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import Private from './components/Private/Private'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {

  const user = useSelector(state => state.user)

  return (
    <>
      <div className="App">
        <Switch>
          <Route path="/signup" exact>
            <Signup/>
          </Route>
          <Route path="/forgot" exact>
              <ForgotPassword/>
          </Route>
          { user &&
            <Route path="/private" exact>
                <Private/>
            </Route>
          }
          <Route path="/">
              <Login/>
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default App;
