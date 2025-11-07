import axios from 'axios';

export const API = axios.create({
    baseURL : 'http://localhost:3001',
    timeout : 1000,
    headers : {'Content-Type': 'application/json'}
});

// User
export const getUsers = async () => {
  const { data } = await API.get('/users');
  return data;
};

// Payments
export const getPayments = async (params = {}) => {
  // params: { q, semester, course, _sort, _order }
  const { data } = await API.get('/payments', { params });
  return data;
};

export const addPayment = async (payload) => {
  const { data } = await API.post('/payments', payload);
  return data;
};

export const updatePayment = async (id, payload) => {
  const { data } = await API.put(`/payments/${id}`, payload);
  return data;
};

export const deletePayment = async (id) => {
  await API.delete(`/payments/${id}`);
  return true;
};