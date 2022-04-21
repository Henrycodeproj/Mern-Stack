import './App.css';
import  { Signup } from './components/signup/Signup';
import { Display } from './components/display';
import { Navbar } from './components/navigation/navbar'
import { SideImage } from './components/signup/SideImage'
import { ModalFiles } from './components/Contexts/Modal'

function App() {

  return (
    <div className="App">
      <ModalFiles>
      <header>
        <Navbar/>
      </header>
      <main>
      <div className='landing-wrapper'>
        <div className='signup-container'>
          <Signup/>
        </div>
        <SideImage/>
      </div>
      </main>
      </ModalFiles>
      {/* <Display/> */}
    </div>
  );
}

export default App;
