import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import NotFound from './NotFound';
import Dashboard from './Pages/Dashboard';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
