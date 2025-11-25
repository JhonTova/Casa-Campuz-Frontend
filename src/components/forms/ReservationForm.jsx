import { useState } from 'react';
import { requestService } from '../../services/requestService';
import { validateEmail, validatePhone } from '../../utils/helpers';
import Input from '../common/Input';
import Button from '../common/Button';
import { toast } from 'react-toastify';

const ReservationForm = ({ propertyId, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!validateEmail(formData.email)) newErrors.email = 'Email inválido';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Teléfono debe tener 10 dígitos';
    if (!formData.date) newErrors.date = 'La fecha es requerida';
    if (!formData.time) newErrors.time = 'La hora es requerida';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await requestService.createReservation({ ...formData, propertyId });
      toast.success('Reserva solicitada exitosamente');
      onSuccess();
    } catch (error) {
      toast.error('Error al solicitar reserva');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nombre completo"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <Input
        label="Correo electrónico"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <Input
        label="Teléfono"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        required
      />
      <Input
        label="Fecha preferida"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
        required
      />
      <Input
        label="Hora preferida"
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        error={errors.time}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje adicional</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="3"
          className="input-field"
          placeholder="Información adicional sobre su visita"
        />
      </div>
      <Button type="submit" fullWidth disabled={loading}>
        {loading ? 'Enviando...' : 'Solicitar Reserva'}
      </Button>
    </form>
  );
};

export default ReservationForm;