import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { propertyService } from '../../services/propertyService';
import AdminLayout from '../../components/admin/AdminLayout';
import PropertyTable from '../../components/admin/PropertyTable';
import PropertyForm from '../../components/admin/PropertyForm';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await propertyService.getAll();
      setProperties(data);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProperty(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    loadProperties();
  };

  if (loading) return <Loader fullScreen />;

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Propiedades</h1>
          <p className="text-gray-600">Gestiona todas las propiedades</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="flex items-center space-x-2">
          <Plus size={20} />
          <span>Nueva Propiedad</span>
        </Button>
      </div>

      <PropertyTable
        properties={properties}
        onEdit={handleEdit}
        onUpdate={loadProperties}
      />

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingProperty ? 'Editar Propiedad' : 'Nueva Propiedad'}
        size="large"
      >
        <PropertyForm
          property={editingProperty}
          onSuccess={handleSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>
    </AdminLayout>
  );
};

export default AdminProperties;