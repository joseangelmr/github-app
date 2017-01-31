import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reducer from './redux/reducer'

const rootReducer = combineReducers({
    routing: routerReducer,
    global: reducer
});

export default rootReducer;