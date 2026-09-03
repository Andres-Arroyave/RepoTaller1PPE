import api from './api';

export const paquetesService = {
  async getPaquetes({ page = 1, limit = 9, search = '' }) {
    const params = { page, limit };
    if (search && search.trim() !== '') {
      params.search = search.trim();
    }
    const response = await api.get('/paquetes', { params });
    return response.data;
  },

  async getPaqueteById(id) {
    const response = await api.get(`/paquetes/${id}`);
    return response.data;
  },

  async createPaquete(paqueteData) {
    const response = await api.post('/paquetes', paqueteData);
    return response.data;
  },

  async updatePaquete(id, paqueteData) {
    const response = await api.patch(`/paquetes/${id}`, paqueteData);
    return response.data;
  },

  async deletePaquete(id) {
    const response = await api.delete(`/paquetes/${id}`);
    return response.data;
  },
};
