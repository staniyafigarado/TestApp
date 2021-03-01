import { ADD_ITEM } from '../Store/actionTypes';
const initialState = {
    itemList: []
}
const rootReducer = (state = { itemList: [] }, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                itemList: state.itemList?.concat(action.payload)

            }
        default:
            return state
    }
}
export default rootReducer;