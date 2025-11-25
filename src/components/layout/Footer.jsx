import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 size={28} />
              <span className="text-xl font-bold">Casa Campuz</span>
            </div>
            <p className="text-gray-400">
              Tu aliado confiable para encontrar la propiedad perfecta.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/propiedades" className="text-gray-400 hover:text-white transition-colors">Propiedades</Link></li>
              <li><Link to="/contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone size={18} />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} />
                <span>info@casacampuz.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>Bogotá, Colombia</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Horario</h3>
            <p className="text-gray-400">
              Lunes - Viernes<br />
              9:00 AM - 6:00 PM<br /><br />
              Sábados<br />
              10:00 AM - 2:00 PM
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Casa Campuz. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;