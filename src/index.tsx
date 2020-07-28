import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import AppRouter from './Pages/AppRouter';
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from "./redux/store";


require('dotenv').config();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

