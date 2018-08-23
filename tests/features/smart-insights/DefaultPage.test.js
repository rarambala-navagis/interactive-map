import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/smart-insights/DefaultPage';

describe('smart-insights/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      smartInsights: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.smart-insights-default-page').length
    ).toBe(1);
  });
});
