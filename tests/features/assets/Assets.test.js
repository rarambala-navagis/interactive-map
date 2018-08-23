import React from 'react';
import { shallow } from 'enzyme';
import { Assets } from '../../../src/features/assets';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Assets />);
  expect(renderedComponent.find('.assets-assets').length).toBe(1);
});
