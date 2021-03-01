import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Store/reducers';

const middleware = [thunk]
const store = createStore(rootReducer, applyMiddleware(...middleware))
export default store