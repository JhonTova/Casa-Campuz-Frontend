import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import PropertyCard from '../properties/PropertyCard';
import Loader from '../common/Loader';
import Button from '../common/Button';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    try {
      const data = await propertyService.getFeatured();
      setProperties(data.slice(0, 6));
    } catch (error) {
      console.error('Error loading featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Propiedades Destacadas
          </h2>
          <p className="text-gray-600 text-lg">
            Descubre las mejores opciones disponibles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/propiedades">
            <Button variant="outline">Ver todas las propiedades</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;