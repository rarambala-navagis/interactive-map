import React from 'react';
import { shallow } from 'enzyme';
import { Sites } from '../../../src/features/sites/Sites';

describe('sites/Sites', () => {
  it('renders node with correct class name', () => {
    const props = {
      sites: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Sites {...props} />
    );

    expect(
      renderedComponent.find('.sites-sites').length
    ).toBe(1);
  });
});
