import React from 'react';
import {shallow} from 'enzyme';

import {Nav} from './navbar';

describe('<Nav/>', () => {
  it('Renders without crashing', () => {
    const dispatch = jest. fn();
    console.log(dispatch, 'this is dispatch')
    shallow(<Nav initialHour={jest.fn()} endHour={jest.fn()} dispatch={() => {}} />);
  })
  it ('Test the test', () => {
    
    expect(2).toEqual(2);
  })
});