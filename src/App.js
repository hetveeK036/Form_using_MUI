// import Form from './component/form';

// function App() {
  //   return (
    //     <div className="App">
    //         <h1> Hello </h1>
    //         <Form/>
    //     </div>
    //   );
    // }
    
    // export default App;
    import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Form from './component/form';


function App({ children }) {
  return (
    <div className="App">
      <Form/>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
    </div>
 
  );
}
export default App;
