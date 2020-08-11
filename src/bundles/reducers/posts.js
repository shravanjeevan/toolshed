import _ from 'lodash';
import {
    // GET_TODOS,
    // GET_TODO,
    ADD_POST,
    DELETE_POST,
    EDIT_POST,
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        // case GET_TODOS:
        //     return {
        //         ...state,
        //         ..._.mapKeys(action.payload, 'id'),
        //     };
        // case GET_TODO:
        case ADD_POST:
        case EDIT_POST:
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        case DELETE_POST:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};
