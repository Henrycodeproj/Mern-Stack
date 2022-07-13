import './App.css';
import  { Signup } from './components/homepage/Signup';
import { Display } from './components/display';
import { Navbar } from './components/navigation/navbar'
import { Errorpage } from './components/config/ErrorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Authentication} from './components/Contexts/authentication'
import { UserAuthentication } from './components/config/userAuth';
import { ExpiredVerification } from "./components/config/ExpiredVerified"
import { Confirmation } from "./components/config/ConfirmationPage"

function App() {
  return (
    <Router>
    <Authentication>
      <Navbar/>
      <Routes>
      <Route path="/" element ={<Signup/>}/>
      <Route path="/display" element = {<Display/>}/>
      <Route path = "/invalid/expired/" element = {<ExpiredVerification/>}/>
      <Route path = "/valid" element = {<Confirmation/>}/>
      <Route path = "*" element ={<Errorpage/> }/>
      </Routes>
    </Authentication>
    </Router>
  );
}

export default App;
