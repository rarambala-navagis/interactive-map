import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/assets/DefaultPage';

describe('assets/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      assets: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.assets-default-page').length
    ).toBe(1);
  });
});
