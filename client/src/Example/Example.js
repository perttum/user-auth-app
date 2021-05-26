import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeShouts, createNewShout } from '../reducers/exampleReducer'
import ShoutList from './ShoutList/ShoutList'

// This component is an example of how to fetch & display data from backend

const Example = () => {

  const dispatch = useDispatch()

  // All example shouts are found from here (after data has been initialized)
  const exampleData = useSelector(state => state.example)
  // State to store input
  const [shoutInput, setShoutInput] = useState('')

  // Get all shouts when page loads
  useEffect(() => {
    dispatch(initializeShouts())
  }, [dispatch])

  // Handle shout input change
  const onInput = (e) => {
    e.preventDefault()
    setShoutInput(e.target.value)
  }

  // Submit new shout - Check exampleReducer.js
  const onSubmitShout = (e) => {
    e.preventDefault()
    const newShout = { shout: shoutInput }
    dispatch(createNewShout(newShout))
    setShoutInput('')
  }

  return(
    <div>
      <form>
      <input
        id="shout-box"
        type="text"
        value={shoutInput}
        onChange={onInput}
      />
      <button
        onClick={onSubmitShout}
      >
        shout something
      </button>
      </form>
      <ShoutList shouts={exampleData}/>
      <small style={{border: '2px solid green', padding: '1em', borderRadius: '10px'}}>
        If you see your shouts, app is connected to server & DB and you should be good to go with your project!
      </small>

    </div>
  )
}

export default Example