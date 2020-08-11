import backend from '../apis/backend';
import { stopSubmit } from 'redux-form';

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
} from './types';

// GET USER ACTION
export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    try {
        const res = await backend.get('/auth/user/', tokenConfig(getState));
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// LOGIN USER ACTION
export const login = ({ username, password }) => async (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ username, password });

    try {
        const res = await backend.post('/auth/login/', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        });
        dispatch(stopSubmit('loginForm', err.response.data)); // pass server-side errors to Redux Form fields
    }
};

// REGISTER USER ACTION
export const register = ({ username, email, password }) => async (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ username, email, password });

    try {
        const res = await backend.post('/auth/register/', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
        });
        dispatch(stopSubmit('registerForm', err.response.data));
    }
};


// LOGOUT USER ACTION
export const logout = () => async (dispatch, getState) => {
    await backend.post('/auth/logout/', null, tokenConfig(getState));
    dispatch({
        type: LOGOUT_SUCCESS,
    });
};

// helper function that gets and sets tokens
export const tokenConfig = (getState) => {
    // Get token
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};
