import React from 'react';
import { shallow } from 'enzyme';
import { TwoLevelPieChart } from '../../../src/features/trending-charts';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<TwoLevelPieChart />);
  expect(renderedComponent.find('.trending-charts-two-level-pie-chart').length).toBe(1);
});
