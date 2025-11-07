import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import * as api from '../services/api';

const PaymentContext = createContext();

const initialState = {
  items: [],
  filters: { query: '', semester: '', course: '', sort: 'course_asc' },
  loading: false,
  error: null,
};

function paymentReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(p => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'DELETE_ITEM':
      return { ...state, items: state.items.filter(p => p.id !== action.payload) };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, [action.field]: action.value } };
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };
    default:
      return state;
  }
}

export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  const fetchPayments = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await api.getPayments();
     const normalized = (Array.isArray(data) ? data : [])
  .filter(Boolean)
  .map(p => ({ ...p, id: Number(p.id ?? p.id), userId: Number(p.userId ?? p.userId), course: p.course ?? p.courseName }));
      dispatch({ type: 'SET_ITEMS', payload: normalized });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: e.message || 'Failed to fetch payments' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => { fetchPayments(); }, []);

  const semesters = useMemo(
    () => Array.from(new Set(state.items.map(p => p.semester))).filter(Boolean),
    [state.items]
  );
  const courses = useMemo(
    () => Array.from(new Set(state.items.map(p => p.course))).filter(Boolean),
    [state.items]
  );

  // Safe comparators
  const s = (v) => (v ?? '').toString();
  const view = useMemo(() => {
    const { query, semester, course, sort } = state.filters;
    let list = [...state.items];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(p =>
        (p.semester || '').toLowerCase().includes(q) ||
        (p.course || '').toLowerCase().includes(q)
      );
    }
    if (semester) list = list.filter(p => p.semester === semester);
    if (course) list = list.filter(p => p.course === course);

    const by = {
      course_asc:  (a, b) => s(a.course).localeCompare(s(b.course)),
      course_desc: (a, b) => s(b.course).localeCompare(s(a.course)),
      date_asc:    (a, b) => new Date(a?.date ?? 0) - new Date(b?.date ?? 0),
      date_desc:   (a, b) => new Date(b?.date ?? 0) - new Date(a?.date ?? 0),
      amount_asc:  (a, b) => Number(a?.amount ?? 0) - Number(b?.amount ?? 0),
      amount_desc: (a, b) => Number(b?.amount ?? 0) - Number(a?.amount ?? 0),
    };
    list.sort(by[sort] || by.course_asc);
    return list;
  }, [state.items, state.filters]);

  const totalAmount = useMemo(
    () => view.reduce((sum, p) => sum + Number(p.amount || 0), 0),
    [view]
  );

  // CRUD
  const addPayment = async (payload) => {
    const created = await api.addPayment(payload);
    dispatch({ type: 'ADD_ITEM', payload: created });
    return created;
  };
  const updatePayment = async (id, payload) => {
    const updated = await api.updatePayment(id, payload);
    dispatch({ type: 'UPDATE_ITEM', payload: updated });
    return updated;
  };
  const deletePayment = async (id) => {
    await api.deletePayment(id);
    dispatch({ type: 'DELETE_ITEM', payload: id });
  };
  const getPaymentById = (id) => state.items.find(p => String(p.id) === String(id));

  const setFilter = (field, value) => dispatch({ type: 'SET_FILTER', field, value });
  const resetFilters = () => dispatch({ type: 'RESET_FILTERS' });

  const value = {
    state, loading: state.loading, error: state.error,
    items: state.items, view, totalAmount,
    semesters, courses, setFilter, resetFilters, fetchPayments,
    addPayment, updatePayment, deletePayment, getPaymentById,
  };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};

export const usePaymentContext = () => useContext(PaymentContext);
