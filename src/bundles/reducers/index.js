import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { LOGOUT_SUCCESS } from '../actions/types';

import posts from './posts';
import auth from './auth'; // added

// export default combineReducers({
//     form: formReducer,
//     posts,
//     auth, // added
// });

const appReducer = combineReducers({
    form: formReducer,
    posts,
    auth,
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined;                  // re-initialize the state when logged out to purge store
    }
    return appReducer(state, action);
};

export default rootReducer;
