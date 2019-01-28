import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {appointmentReducer} from './reducers/appointmentReducer';

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  
export default createStore(
  appointmentReducer,
  applyMiddleware(thunk)
);
