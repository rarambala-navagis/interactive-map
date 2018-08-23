import React from 'react';
import { shallow } from 'enzyme';
import { Site } from '../../../src/features/sites';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Site />);
  expect(renderedComponent.find('.sites-site').length).toBe(1);
});
