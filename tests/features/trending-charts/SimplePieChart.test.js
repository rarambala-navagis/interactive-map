import React from 'react';
import { shallow } from 'enzyme';
import { SimplePieChart } from '../../../src/features/trending-charts';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SimplePieChart />);
  expect(renderedComponent.find('.trending-charts-simple-pie-chart').length).toBe(1);
});
