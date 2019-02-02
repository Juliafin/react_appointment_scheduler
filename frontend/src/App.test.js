import React from 'react';
import {App} from './App';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
  const dispatch = jest.fn();
  shallow(<App dispatch={dispatch}/>);
});
