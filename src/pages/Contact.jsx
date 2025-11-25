import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/forms/ContactForm';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contáctanos</h1>
        <p className="text-gray-600 text-lg">
          Estamos aquí para ayudarte a encontrar tu propiedad ideal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de Contacto</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Phone className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Teléfono</h3>
                <p className="text-gray-600">+57 300 123 4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Mail className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                <p className="text-gray-600">info@casacampuz.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <MapPin className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Dirección</h3>
                <p className="text-gray-600">Calle 123 #45-67<br />Bogotá, Colombia</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Clock className="text-primary-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Horario de Atención</h3>
                <p className="text-gray-600">
                  Lunes - Viernes: 9:00 AM - 6:00 PM<br />
                  Sábados: 10:00 AM - 2:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un Mensaje</h2>
          <ContactForm onSuccess={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Contact;