import { api } from '../api.js';

export const sendMessage = (values) => api('/messages', { method: 'POST', body: values });
