import './App.css'
import Private from './components/Private/Private'
import Public from './components/Public/Public'
// import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {

  const user = useSelector(state => state.user)

  return (
    <>
      <div className="App">
        {/* <Switch>
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
        </Switch> */}
        { !user ? <Public/> : <Private/>}
      </div>
    </>
  )
}

export default App;
