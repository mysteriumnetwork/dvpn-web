import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Pages/AppRouter';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SSEProvider from './SSEProvider';

require('dotenv').config();

ReactDOM.render(
    <Provider store={store}>
        <SSEProvider>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </SSEProvider>
    </Provider>,
    document.getElementById('root'),
);
