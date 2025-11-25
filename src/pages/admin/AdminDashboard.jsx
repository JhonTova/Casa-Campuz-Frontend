import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MessageSquare, TrendingUp, Home } from 'lucide-react';
import { propertyService } from '../../services/propertyService';
import { requestService } from '../../services/requestService';
import AdminLayout from '../../components/admin/AdminLayout';
import RequestsTable from '../../components/admin/RequestsTable';
import Loader from '../../components/common/Loader';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    availableProperties: 0,
    totalRequests: 0,
    pendingRequests: 0,
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [properties, allRequests] = await Promise.all([
        propertyService.getAll(),
        requestService.getAll(),
      ]);

      setStats({
        totalProperties: properties.length,
        availableProperties: properties.filter(p => p.status === 'disponible').length,
        totalRequests: allRequests.length,
        pendingRequests: allRequests.filter(r => r.status === 'pendiente').length,
      });

      setRequests(allRequests.slice(0, 10));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Resumen de la plataforma</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Propiedades</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalProperties}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <Building2 className="text-primary-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Disponibles</p>
              <p className="text-3xl font-bold text-gray-800">{stats.availableProperties}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Home className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Solicitudes</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalRequests}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MessageSquare className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Pendientes</p>
              <p className="text-3xl font-bold text-gray-800">{stats.pendingRequests}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <TrendingUp className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Solicitudes Recientes</h2>
          <Link to="/admin/solicitudes" className="text-primary-600 hover:text-primary-700 font-medium">
            Ver todas
          </Link>
        </div>
        <RequestsTable requests={requests} onUpdate={loadData} compact />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;