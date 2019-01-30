import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import {appointmentReducer, initialState} from './reducers/appointmentReducer';

// const enhancers = compose(
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  
export default createStore(
  appointmentReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
