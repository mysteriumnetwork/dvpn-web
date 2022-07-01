/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import sseReducer from '../sse.slice'
import appReducer from '../app.slice'

const rootReducer = combineReducers({
  sse: sseReducer,
  app: appReducer,
})

export default rootReducer

const middleWares = getDefaultMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleWares,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
