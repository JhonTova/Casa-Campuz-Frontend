import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../common/Button';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Encuentra tu hogar ideal
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Miles de propiedades disponibles para ti
          </p>
          <Link to="/propiedades">
            <Button variant="secondary" className="inline-flex items-center space-x-2">
              <Search size={20} />
              <span>Explorar Propiedades</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L1440,32L1440,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;