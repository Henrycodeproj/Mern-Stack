import './App.css';
import  { Signup } from './components/homepage/Signup';
import { Display } from './components/display';
import { Navbar } from './components/navigation/navbar'
import { Errorpage } from './components/ErrorPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element ={<Signup/>}/>
        <Route path="/display" element = {<Display/>}/>
        <Route path = "*" element ={<Errorpage/> }/>
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