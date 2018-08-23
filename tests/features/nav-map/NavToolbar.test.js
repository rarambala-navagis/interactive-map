import React from 'react';
import { shallow } from 'enzyme';
import { NavToolbar } from '../../../src/features/nav-map';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<NavToolbar />);
  expect(renderedComponent.find('.nav-map-nav-toolbar').length).toBe(1);
});
