import { useState } from 'react';
import { MapPin, Bed, Bath, Maximize, Calendar } from 'lucide-react';
import { formatPrice, getImageUrl } from '../../utils/helpers';
import ContactForm from '../forms/ContactForm';
import ReservationForm from '../forms/ReservationForm';
import Modal from '../common/Modal';
import Button from '../common/Button';

const PropertyDetail = ({ property }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="mb-4">
            <img
              src={getImageUrl(property.images[selectedImage])}
              alt={property.title}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={getImageUrl(image)}
                alt={`${property.title} ${index + 1}`}
                onClick={() => setSelectedImage(index)}
                className={`w-full h-24 object-cover rounded-lg cursor-pointer ${
                  selectedImage === index ? 'ring-2 ring-primary-600' : ''
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {property.operationType === 'venta' ? 'Venta' : 'Alquiler'}
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              property.status === 'disponible' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {property.status === 'disponible' ? 'Disponible' : 'No disponible'}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin size={20} className="mr-2" />
            <span>{property.address}, {property.city}</span>
          </div>

          <p className="text-4xl font-bold text-primary-600 mb-6">
            {formatPrice(property.price)}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Bed size={24} className="mx-auto mb-2 text-primary-600" />
              <p className="text-2xl font-bold text-gray-800">{property.bedrooms}</p>
              <p className="text-sm text-gray-600">Habitaciones</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Bath size={24} className="mx-auto mb-2 text-primary-600" />
              <p className="text-2xl font-bold text-gray-800">{property.bathrooms}</p>
              <p className="text-sm text-gray-600">Baños</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Maximize size={24} className="mx-auto mb-2 text-primary-600" />
              <p className="text-2xl font-bold text-gray-800">{property.area}</p>
              <p className="text-sm text-gray-600">m²</p>
            </div>
          </div>

          {property.status === 'disponible' && (
            <div className="space-y-3">
              <Button fullWidth onClick={() => setShowReservationModal(true)} className="flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>Reservar Propiedad</span>
              </Button>
              <Button fullWidth variant="outline" onClick={() => setShowContactModal(true)}>
                Solicitar Información
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Descripción</h2>
        <p className="text-gray-600 leading-relaxed">{property.description}</p>
      </div>

      {property.features && property.features.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Características</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {property.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title="Solicitar Información">
        <ContactForm propertyId={property._id} onSuccess={() => setShowContactModal(false)} />
      </Modal>

      <Modal isOpen={showReservationModal} onClose={() => setShowReservationModal(false)} title="Reservar Propiedad">
        <ReservationForm propertyId={property._id} onSuccess={() => setShowReservationModal(false)} />
      </Modal>
    </div>
  );
};

export default PropertyDetail;