import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Pages/AppRouter';
import { Provider } from 'react-redux';
import { store } from './redux/store';

require('dotenv').config();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
