import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {appointmentReducer, initialState} from './reducers/appointmentReducer';
import {composeWithDevTools} from 'redux-devtools-extension';

  
export default createStore(
  appointmentReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
