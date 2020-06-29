import {createStore} from "redux";
import {userReducer} from './reducers/UserReducer';

export const store = createStore(userReducer);