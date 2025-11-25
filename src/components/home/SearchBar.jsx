import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PROPERTY_TYPES, CITIES } from '../../utils/constants';
import Button from '../common/Button';

const SearchBar = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: '',
    city: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    navigate(`/propiedades?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 -mt-16 relative z-10 max-w-5xl mx-auto">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <select name="type" value={filters.type} onChange={handleChange} className="input-field">
          <option value="">Tipo de propiedad</option>
          {PROPERTY_TYPES.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>

        <select name="city" value={filters.city} onChange={handleChange} className="input-field">
          <option value="">Ciudad</option>
          {CITIES.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Precio mínimo"
          className="input-field"
        />

        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Precio máximo"
          className="input-field"
        />

        <Button type="submit" className="flex items-center justify-center space-x-2">
          <Search size={20} />
          <span>Buscar</span>
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;