import { api } from '../../api/api';
import { toast } from 'react-toastify';

export const setUser = (user) => ({ type: 'SET_USER', payload: user });
export const setRoles = (roles) => ({ type: 'SET_ROLES', payload: roles });
export const setTheme = (theme) => ({ type: 'SET_THEME', payload: theme });
export const setLanguage = (lang) => ({ type: 'SET_LANGUAGE', payload: lang });

export const fetchRolesAction = () => (dispatch, getState) => {
  const { roles } = getState().client;
  if (roles && roles.length > 0) return;

  api.get('/roles')
    .then((res) => dispatch(setRoles(res.data)))
    .catch((err) => console.error('Roles Fetch Error:', err));
};


export const loginUserAction = (credentials, rememberMe, navigate) => async (dispatch) => {
  try {
    const response = await api.post('/login', credentials);
    const user = response.data;

    
    if (rememberMe) {
      localStorage.setItem('token', user.token);
    }
   
    api.defaults.headers.common['Authorization'] = user.token;
    dispatch(setUser(user));
    
    toast.success('Login successful! Redirecting...');

    setTimeout(() => {
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }, 1500);

  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed.');
    throw error;
  }
};


export const verifyTokenAction = () => async (dispatch) => {
  
  const token = localStorage.getItem('token');
  
  if (!token) {
    
    delete api.defaults.headers.common['Authorization'];
    return;
  }

  
  api.defaults.headers.common['Authorization'] = token;

  try {
    
    const response = await api.get('/verify');
    const user = response.data; 

    
    localStorage.setItem('token', user.token);
    api.defaults.headers.common['Authorization'] = user.token;

    
    dispatch(setUser(user));
    
  } catch (error) {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};