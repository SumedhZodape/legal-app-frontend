import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import NotFound from './NotFound';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
