import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminProvider } from './context/AdminContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProperties from './pages/admin/AdminProperties';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/propiedades" element={<AdminProperties />} />
              </Routes>
            </ProtectedRoute>
          } />

          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/propiedades" element={<Properties />} />
                <Route path="/propiedades/:id" element={<PropertyDetails />} />
                <Route path="/contacto" element={<Contact />} />
              </Routes>
            </Layout>
          } />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AdminProvider>
  );
}

export default App;