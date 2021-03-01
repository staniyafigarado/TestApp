import { ADD_ITEM } from '../Store/actionTypes';
export const addItem = item => {
    return (dispatch) => {
        return dispatch({
            type: ADD_ITEM,
            payload: item
        });
    };
};