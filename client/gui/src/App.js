import './App.css';
import {useState} from 'react'

function App() {
  const [newUser,setnewUser] = useState({
    username:"",
    password:""
  })

  const handleForm = (e) =>{
    const {name,value} = e.target
    e.preventDefault()
    setnewUser({...newUser, [name]:value});
    console.log(newUser)
  }

  return (
    <div className="App">
      <form onSubmit={handleForm}>
        <label>username</label>
        <input name = "username" value = {newUser.username} onChange={handleForm}></input>
        <label>password</label>
        <input name = "password" value = {newUser.password} onChange={handleForm}></input>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default App;
