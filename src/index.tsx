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
import { ToastProvider } from 'react-toast-notifications';

import AppRouter from './Pages/AppRouter';
import { store } from './redux/store';
import SSEListener from './SSEListener';
import OnboardingListener from './OnboardingListener';

require('dotenv').config();

ReactDOM.render(
    <Provider store={store}>
        <ToastProvider placement="top-right">
            <SnackbarProvider maxSnack={3} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <SSEListener>
                    <OnboardingListener>
                        <BrowserRouter>
                            <AppRouter/>
                        </BrowserRouter>
                    </OnboardingListener>
                </SSEListener>
            </SnackbarProvider>
        </ToastProvider>
    </Provider>,
    document.getElementById('root'),
);
