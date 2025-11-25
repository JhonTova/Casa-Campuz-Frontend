import Hero from '../components/home/Hero';
import SearchBar from '../components/home/SearchBar';
import FeaturedProperties from '../components/home/FeaturedProperties';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar />
      </div>
      <FeaturedProperties />
      
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Busca</h3>
              <p className="text-gray-600">Explora miles de propiedades disponibles</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Reserva</h3>
              <p className="text-gray-600">Agenda una visita a tu propiedad favorita</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Encuentra</h3>
              <p className="text-gray-600">Consigue el hogar de tus sueños</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;