import TequilapiError from 'mysterium-vpn-js/lib/tequilapi-error'
import { Store } from 'redux'
import { RootState } from '../rootState.type'
import { push } from 'connected-react-router'

class Unauthorized {
  private store: Store<RootState>
  private route: string

  protected canRedirect() {
    if (!(this.store && this.route)) {
      return false
    }

    const state = this.store.getState()

    return state.router.location.pathname !== this.route;
  }

  init(store: Store<RootState>, route: string) {
    this.store = store
    this.route = route
  }

  onError(error: TequilapiError) {
    if (error && error.isUnauthorizedError && this.canRedirect()) {
      this.store.dispatch(push(this.route))
    }
  }
}

export default new Unauthorized()
