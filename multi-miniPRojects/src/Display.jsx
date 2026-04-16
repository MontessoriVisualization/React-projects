import React from 'react'
import usercontext from './context/usercontext'

const Display = () => {
  const {user} = React.useContext(usercontext);
  return (
    <div>
      {user.map((element, index) => (
        <div key={index}>
          <p>Name: {element.name}</p>
          <p>Email: {element.email}</p>
        </div>
      ))}
    </div>
  )
}

export default Display
