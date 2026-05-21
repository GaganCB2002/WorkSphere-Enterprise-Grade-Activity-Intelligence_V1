import { combineReducers } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('user');
const initialAuthState = { 
  isAuthenticated: !!savedUser, 
  user: savedUser ? JSON.parse(savedUser) : null, 
  loading: false, 
  error: null 
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', 'mock-jwt-enterprise-session-token');
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, isAuthenticated: true, user: action.payload, loading: false };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { isAuthenticated: false, user: null, loading: false, error: null };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
