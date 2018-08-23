import React from 'react';
import { shallow } from 'enzyme';
import { TrendingCharts } from '../../../src/features/trending-charts';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<TrendingCharts />);
  expect(renderedComponent.find('.trending-charts-trending-charts').length).toBe(1);
});
