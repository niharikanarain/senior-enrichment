/* combineReducers is not currently used, but eventually should be for modular code :D */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import students from './students'
import campuses from './campuses'


const rootReducer = combineReducers({ students, campuses })

export default rootReducer
export * from './students'
export * from './campuses'
