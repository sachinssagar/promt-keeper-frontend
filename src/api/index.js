import { config } from '../config';
import { reqAnonPost, reqAnonGet, reqAnonPut, reqDelete } from '../utils/requests';

const apiBaseUrl = config.apiBaseUrl;
console.log('🚀 ~ apiBaseUrl:', apiBaseUrl);

const apiCalls = {
  // Item
  getAllItems: () => reqAnonGet(`${apiBaseUrl}/items`),
  getItem: (id) => reqAnonGet(`${apiBaseUrl}/items/${id}`),
  addItem: (data) => reqAnonPost(`${apiBaseUrl}/items`, data),
  updateItem: (id, data) => reqAnonPut(`${apiBaseUrl}/items/${id}`, data),
  deleteItem: (id) => reqDelete(`${apiBaseUrl}/items/${id}`),
};

export default apiCalls;
