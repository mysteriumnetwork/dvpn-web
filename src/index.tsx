import * as React from 'react';
import { render } from 'react-dom';
import Root from './app/components/Root/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.scss';

const store = configureStore();

render(
  <Root store={store} history={history}/>,
  document.getElementById('root')
);
