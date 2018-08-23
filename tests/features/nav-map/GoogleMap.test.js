import React from 'react';
import { shallow } from 'enzyme';
import { GoogleMap } from '../../../src/features/nav-map';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<GoogleMap />);
  expect(renderedComponent.find('.nav-map-google-map').length).toBe(1);
});
