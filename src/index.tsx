import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import AppRouter from './Pages/AppRouter';
import {Provider} from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

require('dotenv').config();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

