import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware);
export type RootState = ReturnType<typeof rootReducer>;
