import './App.css';
import  { Signup } from './components/signup/Signup';
import { Display } from './components/display';
import { Navbar } from './components/navigation/navbar'
import { SideImage } from './components/signup/SideImage'

function App() {

  return (
    <div className="App">
      <header>
        <Navbar/>
      </header>
      <main>
      <div className='signup-container'>
      <Signup/>
      </div>
      <SideImage/>
      </main>
      <Display/>
    </div>
  );
}

export default App;
