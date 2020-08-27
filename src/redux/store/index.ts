/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware);
export type RootState = ReturnType<typeof rootReducer>;
