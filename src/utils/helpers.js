import { API_URL } from './constants';

export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

// via.placeholder.com ya no existe: el placeholder va incrustado como SVG.
const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">' +
      '<rect width="400" height="300" fill="#e5e7eb"/>' +
      '<text x="200" y="155" font-family="sans-serif" font-size="20" fill="#6b7280" text-anchor="middle">Sin imagen</text>' +
      '</svg>'
  );

// Las imágenes locales cuelgan del mismo servidor que la API, sin el sufijo /api.
const UPLOADS_URL = `${API_URL.replace(/\/api\/?$/, '')}/uploads`;

export const getImageUrl = (imagePath) => {
  if (!imagePath) return PLACEHOLDER_IMAGE;
  if (imagePath.startsWith('http')) return imagePath;
  return `${UPLOADS_URL}/${imagePath}`;
};