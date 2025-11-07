
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import * as api from '../services/api';

const UserContext = createContext();

const initial = {
    items: [],
    loading: false,
    error: null,
    filters: {
        query: '',      // search by username/fullName
        role: '',       // admin | user
        status: '',     // active | blocked | locked
        sort: 'id_asc', // id, username, fullName, role, status
    },
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING': return { ...state, loading: action.value };
        case 'SET_ERROR': return { ...state, error: action.value };
        case 'SET_ITEMS': return { ...state, items: action.value };
        case 'SET_FILTER': return { ...state, filters: { ...state.filters, [action.field]: action.value } };
        default: return state;
    }
}

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initial);

    const fetchUsers = async () => {
        dispatch({ type: 'SET_LOADING', value: true });
        try {
            const data = await api.getUsers();
            const normalized = (Array.isArray(data) ? data : []).filter(Boolean);
            // giữ nguyên id dạng chuỗi như trong db.json
            dispatch({ type: 'SET_ITEMS', value: normalized });
            dispatch({ type: 'SET_ERROR', value: null });

        } catch (e) {
            dispatch({ type: 'SET_ERROR', value: e.message || 'Failed to fetch users' });
        } finally {
            dispatch({ type: 'SET_LOADING', value: false });
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const setFilter = (field, value) => dispatch({ type: 'SET_FILTER', field, value });

    const view = useMemo(() => {
        const { query, role, status, sort } = state.filters;
        let list = [...state.items];

        if (query.trim()) {
            const q = query.trim().toLowerCase();
            list = list.filter(u =>
                (u.username || '').toLowerCase().includes(q) ||
                (u.fullName || '').toLowerCase().includes(q)
            );
        }
        if (role) list = list.filter(u => u.role === role);
        if (status) list = list.filter(u => u.status === status);

        const s = v => (v ?? '').toString().toLowerCase();
        const by = {
            id_asc: (a, b) => a.id - b.id, id_desc: (a, b) => b.id - a.id,
            username_asc: (a, b) => s(a.username).localeCompare(s(b.username)),
            username_desc: (a, b) => s(b.username).localeCompare(s(a.username)),
            fullName_asc: (a, b) => s(a.fullName).localeCompare(s(b.fullName)),
            fullName_desc: (a, b) => s(b.fullName).localeCompare(s(a.fullName)),
            role_asc: (a, b) => s(a.role).localeCompare(s(b.role)),
            role_desc: (a, b) => s(b.role).localeCompare(s(a.role)),
            status_asc: (a, b) => s(a.status).localeCompare(s(b.status)),
            status_desc: (a, b) => s(b.status).localeCompare(s(a.status)),
        };
        list.sort(by[sort] || by.id_asc);
        return list;
    }, [state.items, state.filters]);

   const getById = (id) => state.items.find(u => String(u.id) === String(id));


    // Ban = chuyển status -> 'blocked'
 const banUser = async (id) => {
  const user = getById(id);
  if (!user) return;

  // dùng đúng id gốc trong db (chuỗi)
  const updated = await api.updateUser(user.id, { ...user, status: 'blocked' });

  const replaced = state.items.map(u =>
    String(u.id) === String(updated.id) ? updated : u
  );
  dispatch({ type: 'SET_ITEMS', value: replaced });
  return updated;
};


    const value = {
        ...state,
        items: state.items,
        view,
        fetchUsers,
        setFilter,
        getById,
        banUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUsers = () => useContext(UserContext);
