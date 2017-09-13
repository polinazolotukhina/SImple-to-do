import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './reducer';
import todoReducer from './todoReducer';


const rootReducer = combineReducers({
    todo:todoReducer,
    routing: routerReducer,
});

export default rootReducer;
