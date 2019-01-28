import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {appointmentReducer} from './reducers/appointmentReducer';

export default createStore(
  appointmentReducer,
  applyMiddleware(thunk)
);
