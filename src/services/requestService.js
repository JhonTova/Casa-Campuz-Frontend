import api from './api';

export const requestService = {
  createReservation: async (data) => {
    const response = await api.post('/requests/reservation', data);
    return response.data;
  },

  createContact: async (data) => {
    const response = await api.post('/requests/contact', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/requests');
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/requests/${id}/status`, { status });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
  },
};