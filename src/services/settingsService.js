import { api } from '../api.js';

export const saveSettings = (token, settings) => api('/settings', { method: 'PUT', body: settings, token });
