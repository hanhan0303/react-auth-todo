import ky from 'ky';

export const apiClient = ky.create({
  prefix: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export const authService = {
  register: (userData) => {
    return apiClient.post('users/register', { json: userData }).json();
  },
  login: (userData) => {
    return apiClient.post('users/login', { json: userData }).json();
  },
  check: () => {
    return apiClient.get('users/me').json();
  },
};

export const todoService = {
  getAll: () => {
    return apiClient.get('todos').json();
  },
  getById: (id) => {
    return apiClient.get(`todos/${id}`).json();
  },
  create: (todoData) => {
    return apiClient.post('todos', { json: todoData }).json();
  },
  update: (id, todoData) => {
    return apiClient.put(`todos/${id}`, { json: todoData }).json();
  },
  delete: (id) => {
    return apiClient.delete(`todos/${id}`);
  },
};
