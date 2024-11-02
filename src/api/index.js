import { config } from '../config';
import { reqAnonPost, reqAnonGet, reqAnonPut, reqDelete } from '../utils/requests';

const apiBaseUrl = config.apiBaseUrl;

const apiCalls = {
  getAllItems: (params) => reqAnonGet(`${apiBaseUrl}/promts`, params),
  getItem: (id) => reqAnonGet(`${apiBaseUrl}/promts/${id}`),
  addItem: (data) => reqAnonPost(`${apiBaseUrl}/promts`, data),
  updateItem: (id, data) => reqAnonPut(`${apiBaseUrl}/promts/${id}`, data),
  deleteItem: (id) => reqDelete(`${apiBaseUrl}/promts/${id}`),
};

export default apiCalls;
