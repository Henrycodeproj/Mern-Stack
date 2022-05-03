import './App.css';
import  { Signup } from './components/homepage/Signup';
import { Display } from './components/display';
import { Navbar } from './components/navigation/navbar'
import { Errorpage } from './components/config/ErrorPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { UserAuthentication} from "./components/config/userAuth"

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route element = {<UserAuthentication/>}>
          <Route path="/" element ={<Signup/>}/>
          <Route path="/display" element = {<Display/>}/>
          <Route path = "*" element ={<Errorpage/> }/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


// return (
//   <div className="App">
//     <header>
//       <Navbar/>
//     </header>
//       <main>
//       <div className='landing-wrapper'>
//         <div className='signup-container'>
//           <Signup/>
//         </div>
//         <SideImage/>
//       </div>
//       </main>
//       {/* <Display/> */}
//   </div>
// );