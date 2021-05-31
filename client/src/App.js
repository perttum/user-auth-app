import './sass/app.scss'
import Private from './components/Private/Private'
import Public from './components/Public/Public'
import { useSelector } from 'react-redux'

function App() {

  const user = useSelector(state => state.user)

  return (
    <>
      <div>
        { !user ? <Public/> : <Private/>}
      </div>
    </>
  )
}

export default App;
