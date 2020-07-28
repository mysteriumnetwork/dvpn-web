import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session'
import thunk from 'redux-thunk';

import rootReducer from '../reducers';


const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunk);

export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
