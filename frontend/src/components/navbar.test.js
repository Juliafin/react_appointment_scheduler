import React from 'react';
import {shallow} from 'enzyme';

import {Nav} from './navbar';

describe('<Nav/>', () => {
  it('Renders without crashing', () => {
    const dispatch = jest. fn();
    shallow(<Nav initialHour={jest.fn()} endHour={jest.fn()} dispatch={dispatch} />);
  });

  it('')
});