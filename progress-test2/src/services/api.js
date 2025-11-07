// src/services/api.js
import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

// USERS
export const getUsers = async () => (await API.get('/users')).data;

// ⬇️ Thêm/chỉnh đúng tên hàm này
export const updateUser = async (id, payload) =>
  (await API.put(`/users/${id}`, payload)).data;

// PAYMENTS
export const getPayments = async (params = {}) =>
  (await API.get('/payments', { params })).data;

export const addPayment = async (payload) =>
  (await API.post('/payments', payload)).data;

export const updatePayment = async (id, payload) =>
  (await API.put(`/payments/${id}`, payload)).data;

export const deletePayment = async (id) => {
  await API.delete(`/payments/${id}`);
  return true;
};
