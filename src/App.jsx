import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import NotFound from './NotFound';
import Dashboard from './Pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import Registration from './Pages/Registration';
import Profile from './Pages/Profile';
import ProtectRoute from './ProtectRoute';
import AdminDashboard from './Pages/AdminDashboard';
import ClientDashboard from './Pages/ClientDashboard';

function App() {

  return (
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/profile" element={<Profile/>}/>
          


          {/* admin dashboard */}
          <Route path="/admin-dashboard" element={

            <ProtectRoute>
              <AdminDashboard/>
            </ProtectRoute>
            
          }/>

          {/* client dashboard */}
          <Route path="/client-dashboard" element={

            <ProtectRoute>
              <ClientDashboard/>
            </ProtectRoute>
            
          }/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
