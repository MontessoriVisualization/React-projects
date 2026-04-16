import React from 'react'
import Display from './display'
import Form from './Form'
import UserProvider from './context/UserContext.jsx'
const App = () => {
  return (
    <div>
      <UserProvider>
        <Form />
        <Display />
      </UserProvider>
    </div>
  )
}

export default App


