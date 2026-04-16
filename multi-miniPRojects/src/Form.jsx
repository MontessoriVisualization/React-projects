import React from 'react'
import usercontext from './context/usercontext'

const Form = () => {
    const {user,setUser} = React.useContext(usercontext);
    const nameRef = React.useRef();
    const emailRef = React.useRef();
    const handelSubmit = (e) => {
        e.preventDefault();
        setUser([...user, {name: nameRef.current.value, email: emailRef.current.value}]);

    }


  return (
    <>
<label >
    Name: <input type="text" name="name" ref={nameRef} />
</label> 
<label>
    Email: <input type="email" name="email" ref={emailRef} />
</label>
<button type="submit" onClick={handelSubmit}>Submit</button>

    </>
  )
}

export default Form
