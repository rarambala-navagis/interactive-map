import React from 'react';
import { shallow } from 'enzyme';
import { SimpleLineChart } from '../../../src/features/trending-charts';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SimpleLineChart />);
  expect(renderedComponent.find('.trending-charts-simple-line-chart').length).toBe(1);
});
