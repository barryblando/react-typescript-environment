import React from 'react';
import { shallow } from 'enzyme';

import initialState from './mocks/body';

import { Body } from '../components/Body';

describe('<Body Component Test />', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<Body {...initialState} />);
  });

  test('should render basic Body Component with an image', () => {
    expect(wrapper.find('.body').length).toBe(1);
    expect(wrapper.find('.bodyImg').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
