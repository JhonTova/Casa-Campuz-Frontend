import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { propertyService } from '../services/propertyService';
import PropertyDetail from '../components/properties/PropertyDetail';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      const data = await propertyService.getById(id);
      setProperty(data);
    } catch (error) {
      console.error('Error loading property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-600 text-lg mb-4">Propiedad no encontrada</p>
        <Button onClick={() => navigate('/propiedades')}>Volver a propiedades</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button
        variant="outline"
        onClick={() => navigate('/propiedades')}
        className="mb-6 flex items-center space-x-2"
      >
        <ArrowLeft size={20} />
        <span>Volver</span>
      </Button>
      
      <PropertyDetail property={property} />
    </div>
  );
};

export default PropertyDetails;