import React from 'react'
import usercontext from './usercontext'

const UserProvider = ({ children }) => {
     const [user,setUser] = React.useState([{name:'saugat', email:'saugat@example.com'},{name:'saugat2', email:'saugat2@example.com'}]);

  return (
    <usercontext.Provider value={{user,setUser}}>
      {children}
    </usercontext.Provider>
  )
}

export default UserProvider
   