import { useState, useEffect } from 'react';
import { propertyService } from '../../services/propertyService';
import { PROPERTY_TYPES, CITIES, OPERATION_TYPES, PROPERTY_STATUS } from '../../utils/constants';
import Input from '../common/Input';
import Button from '../common/Button';
import { toast } from 'react-toastify';

const PropertyForm = ({ property, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    operationType: '',
    price: '',
    address: '',
    city: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'disponible',
    features: '',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        description: property.description,
        type: property.type,
        operationType: property.operationType,
        price: property.price,
        address: property.address,
        city: property.city,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        status: property.status,
        features: property.features?.join(', ') || '',
      });
    }
  }, [property]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'features') {
          const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);
          data.append(key, JSON.stringify(featuresArray));
        } else {
          data.append(key, formData[key]);
        }
      });

      images.forEach(image => {
        data.append('images', image);
      });

      if (property) {
        await propertyService.update(property._id, data);
        toast.success('Propiedad actualizada');
      } else {
        await propertyService.create(data);
        toast.success('Propiedad creada');
      }

      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar propiedad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Título"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Propiedad <span className="text-red-500">*</span>
          </label>
          <select name="type" value={formData.type} onChange={handleChange} className="input-field" required>
            <option value="">Seleccionar</option>
            {PROPERTY_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operación <span className="text-red-500">*</span>
          </label>
          <select name="operationType" value={formData.operationType} onChange={handleChange} className="input-field" required>
            <option value="">Seleccionar</option>
            {OPERATION_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <Input
          label="Precio"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ciudad <span className="text-red-500">*</span>
          </label>
          <select name="city" value={formData.city} onChange={handleChange} className="input-field" required>
            <option value="">Seleccionar</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <Input
          label="Dirección"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <Input
          label="Habitaciones"
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          required
        />

        <Input
          label="Baños"
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          required
        />

        <Input
          label="Área (m²)"
          type="number"
          name="area"
          value={formData.area}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado <span className="text-red-500">*</span>
          </label>
          <select name="status" value={formData.status} onChange={handleChange} className="input-field" required>
            {PROPERTY_STATUS.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="input-field"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Características (separadas por coma)
        </label>
        <textarea
          name="features"
          value={formData.features}
          onChange={handleChange}
          rows="3"
          className="input-field"
          placeholder="Ej: Parqueadero, Gimnasio, Piscina"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imágenes {!property && <span className="text-red-500">*</span>}
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="input-field"
          required={!property}
        />
        <p className="text-sm text-gray-500 mt-1">
          Puedes seleccionar múltiples imágenes
        </p>
      </div>

      <div className="flex space-x-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Guardando...' : property ? 'Actualizar' : 'Crear Propiedad'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;