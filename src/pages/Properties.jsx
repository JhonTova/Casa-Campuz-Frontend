import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import PropertyFilters from '../components/properties/PropertyFilters';
import PropertyList from '../components/properties/PropertyList';

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    city: searchParams.get('city') || '',
    operationType: searchParams.get('operationType') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async (customFilters = filters) => {
    setLoading(true);
    try {
      const data = await propertyService.getAll(customFilters);
      setProperties(data);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadProperties(filters);
  };

  const handleReset = () => {
    const emptyFilters = {
      type: '',
      city: '',
      operationType: '',
      bedrooms: '',
      minPrice: '',
      maxPrice: '',
    };
    setFilters(emptyFilters);
    loadProperties(emptyFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Todas las Propiedades</h1>
      
      <PropertyFilters
        filters={filters}
        onFilterChange={setFilters}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <div className="mb-4">
        <p className="text-gray-600">
          {loading ? 'Cargando...' : `${properties.length} propiedad(es) encontrada(s)`}
        </p>
      </div>

      <PropertyList properties={properties} loading={loading} />
    </div>
  );
};

export default Properties;