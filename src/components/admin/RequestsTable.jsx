import { Trash2 } from 'lucide-react';
import { requestService } from '../../services/requestService';
import { formatDate } from '../../utils/helpers';
import { toast } from 'react-toastify';

const RequestsTable = ({ requests, onUpdate, compact = false }) => {
  const handleStatusChange = async (id, currentStatus) => {
    const statuses = ['pendiente', 'contactado', 'completado'];
    const currentIndex = statuses.indexOf(currentStatus);
    const newStatus = statuses[(currentIndex + 1) % statuses.length];

    try {
      await requestService.updateStatus(id, newStatus);
      toast.success('Estado actualizado');
      onUpdate();
    } catch (error) {
      toast.error('Error al actualizar estado');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta solicitud?')) return;

    try {
      await requestService.delete(id);
      toast.success('Solicitud eliminada');
      onUpdate();
    } catch (error) {
      toast.error('Error al eliminar solicitud');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'contactado':
        return 'bg-blue-100 text-blue-800';
      case 'completado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nombre</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Teléfono</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tipo</th>
            {!compact && (
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Fecha</th>
            )}
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {requests.map((request) => (
            <tr key={request._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-800">{request.name}</td>
              <td className="px-6 py-4 text-gray-600">{request.email}</td>
              <td className="px-6 py-4 text-gray-600">{request.phone}</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-sm">
                  {request.type === 'contact' ? 'Contacto' : 'Reserva'}
                </span>
              </td>
              {!compact && (
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {formatDate(request.createdAt)}
                </td>
              )}
              <td className="px-6 py-4">
                <button
                  onClick={() => handleStatusChange(request._id, request.status)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}
                >
                  {request.status}
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDelete(request._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;