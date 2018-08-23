import React from 'react';
import { shallow } from 'enzyme';
import { NavMap } from '../../../src/features/nav-map/NavMap';

describe('nav-map/NavMap', () => {
  it('renders node with correct class name', () => {
    const props = {
      navMap: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <NavMap {...props} />
    );

    expect(
      renderedComponent.find('.nav-map-nav-map').length
    ).toBe(1);
  });
});
