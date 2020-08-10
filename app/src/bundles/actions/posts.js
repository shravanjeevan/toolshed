import { tokenConfig } from './auth'; // added
import backend from '../apis/backend';

/* We don't care about auth for reading posts */
// // GET TODOS
// export const getTodos = () => async (dispatch, getState) => {
//     const res = await axios.get('/api/todos/', tokenConfig(getState));
//     // ...
// };

// // GET TODO
// export const getTodo = (id) => async (dispatch, getState) => {
//     const res = await axios.get(`/api/todos/${id}/`, tokenConfig(getState));
//     // ...
// };

// ADD POST
export const addPost = (formValues) => async (dispatch, getState) => {
    const res = await backend.post(
        '/posts/',
        { ...formValues },
        tokenConfig(getState)
    );
    // ...
};

// DELETE POST
export const deletePost = (id) => async (dispatch, getState) => {
    await backend.delete(`/posts/${id}/`, tokenConfig(getState));
    // ...
};

// EDIT POST
export const editPost = (id, formValues) => async (dispatch, getState) => {
    const res = await backend.put(
        `/posts/${id}/`,
        formValues,
        tokenConfig(getState)
    );
    // ...
};
