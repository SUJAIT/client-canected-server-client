import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
fetch('http://localhost:5000/users')
.then(res => res.json())
.then(data => setUsers(data));
  },[])


  const submitHandler = (event) =>{
    event.preventDefault();
    const form =event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name,email}
    console.log(user)
    fetch('http://localhost:5000/users',{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data =>{
      console.log('inside post response',data)
      const newUsers = [...users,data]
      setUsers(newUsers);
      form.reset();
    })
  }

  return (
   <div>
<h1>User Management System</h1>
<p>All User : {users.length}</p>
<div>
  {
    users.map(user => <p>User name : {user.name} User Gmail : {user.email}</p>)
  }
</div>
<div>
  <form onSubmit={submitHandler}>
    <input type="text" name="name" id=""></input>
    <br />
    <input type='email' name="email" id=''></input>
    <br />
    <input type='submit' value="Add user"></input>
  </form>
</div>
   </div>
  )
}

export default App
