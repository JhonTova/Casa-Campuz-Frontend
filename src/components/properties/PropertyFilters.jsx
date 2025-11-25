import { PROPERTY_TYPES, CITIES, OPERATION_TYPES } from '../../utils/constants';
import Button from '../common/Button';

const PropertyFilters = ({ filters, onFilterChange, onSearch, onReset }) => {
  const handleChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Filtros de Búsqueda</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Operación</label>
          <select name="operationType" value={filters.operationType} onChange={handleChange} className="input-field">
            <option value="">Todas</option>
            {OPERATION_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
          <select name="type" value={filters.type} onChange={handleChange} className="input-field">
            <option value="">Todos</option>
            {PROPERTY_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
          <select name="city" value={filters.city} onChange={handleChange} className="input-field">
            <option value="">Todas</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Habitaciones</label>
          <select name="bedrooms" value={filters.bedrooms} onChange={handleChange} className="input-field">
            <option value="">Todas</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Precio Mínimo</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="$0"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Precio Máximo</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Sin límite"
            className="input-field"
          />
        </div>

        <div className="flex items-end space-x-2 md:col-span-2">
          <Button onClick={onSearch} className="flex-1">Buscar</Button>
          <Button onClick={onReset} variant="secondary">Limpiar</Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;