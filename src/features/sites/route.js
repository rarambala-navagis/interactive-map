// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Sites,
} from './';

export default {
  path: 'sites',
  name: 'Sites',
  childRoutes: [
    { path: 'sites', name: 'Sites', component: Sites, isIndex: true },
  ],
};
