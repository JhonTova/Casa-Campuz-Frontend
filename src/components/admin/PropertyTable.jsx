import { Edit, Trash2, Eye } from 'lucide-react';
import { propertyService } from '../../services/propertyService';
import { formatPrice, getImageUrl } from '../../utils/helpers';
import Button from '../common/Button';
import { toast } from 'react-toastify';

const PropertyTable = ({ properties, onEdit, onUpdate }) => {
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta propiedad?')) return;

    try {
      await propertyService.delete(id);
      toast.success('Propiedad eliminada');
      onUpdate();
    } catch (error) {
      toast.error('Error al eliminar propiedad');
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const statuses = ['disponible', 'reservado', 'vendido', 'alquilado'];
    const currentIndex = statuses.indexOf(currentStatus);
    const newStatus = statuses[(currentIndex + 1) % statuses.length];

    try {
      await propertyService.updateStatus(id, newStatus);
      toast.success('Estado actualizado');
      onUpdate();
    } catch (error) {
      toast.error('Error al actualizar estado');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Imagen</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Título</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ciudad</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Precio</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={getImageUrl(property.images[0])}
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-800">{property.title}</p>
                  <p className="text-sm text-gray-600">{property.type}</p>
                </td>
                <td className="px-6 py-4 text-gray-600">{property.city}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {formatPrice(property.price)}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleStatusChange(property._id, property.status)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      property.status === 'disponible'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {property.status}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(property)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyTable;