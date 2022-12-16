import logo from './logo.svg';
import './App.css';
import './tailwind/style.css';
import  SideBar from './components/Header/SideBar'
// import FullContent from './components/FullContent/FullContent'
// import HttpRequestDemo from './components/FullContent/test';
function App() {
  return (
    <div className="App w-4/5 m-auto">
    
     
     {/* <h1 className='text-red-500'>Hello Ashadul</h1> */}
      
      <SideBar />
      {/* <FullContent /> */}
      {/* <HttpRequestDemo /> */}
      
      
    </div>
  );
}

export default App;
