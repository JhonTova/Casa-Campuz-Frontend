import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { formatPrice, getImageUrl } from '../../utils/helpers';

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/propiedades/${property._id}`} className="card group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={getImageUrl(property.images[0])}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {property.operationType === 'venta' ? 'Venta' : 'Alquiler'}
        </div>
        {property.status !== 'disponible' && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.status === 'reservado' ? 'Reservado' : 'No disponible'}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{property.city}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center space-x-1">
              <Bed size={18} />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath size={18} />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Maximize size={18} />
              <span className="text-sm">{property.area}m²</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-2xl font-bold text-primary-600">
            {formatPrice(property.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;