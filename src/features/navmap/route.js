// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  MainPage,
} from './';

export default {
  path: 'g-map',
  name: 'G map',
  childRoutes: [
    { path: 'main-page', name: 'Main page', component: MainPage, isIndex: true },
  ],
};
