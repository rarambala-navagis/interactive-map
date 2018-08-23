import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/trending-charts/DefaultPage';

describe('trending-charts/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      trendingCharts: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.trending-charts-default-page').length
    ).toBe(1);
  });
});
