/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppRouter from './Pages/AppRouter';
import { store } from './redux/store';
import SSESubscriber from './sse/SSESubscriber';

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <SSESubscriber />
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);
