import {AUTENTIFICATE} from '../actionTypes/UserTypes';
import {AutentificateState, AutentificateTypes} from '../actions/user/autentificate.d';

const INITIAL_STATE: AutentificateState = {
  autentificated: false
};

function autentificateReducer(state = INITIAL_STATE, action: AutentificateTypes): AutentificateState {
  switch (action.type) {
    case AUTENTIFICATE: {
      return {
        ...state,
        autentificated: action.payload,
      };
    }
    default:
      return state;
  }
}

export default autentificateReducer;