import React from 'react'

const ShoutList = ({ shouts }) => {
  
  const displayShouts = shouts && shouts.map(s => {
    return <p key={s.id}>
      { s.shout }
    </p>
  })
  
  return(
    <div style={{marginBottom: '50px'}}>
      <h2>Shouts:</h2>
      { displayShouts && displayShouts }
    </div>
  )
}

export default ShoutList