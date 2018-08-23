import React from 'react';
import { shallow } from 'enzyme';
import { LineBarAreaComposedChart } from '../../../src/features/trending-charts';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LineBarAreaComposedChart />);
  expect(renderedComponent.find('.trending-charts-line-bar-area-composed-chart').length).toBe(1);
});
