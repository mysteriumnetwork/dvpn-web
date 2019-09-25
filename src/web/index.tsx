import { History } from 'history'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core'
import muiTheme from '../mui-theme'
import LP from '../language'
import { translationMessages } from '../language/i18n'
import { ConnectedRouter } from 'connected-react-router'
import App from './web.app'
import * as React from 'react'

type RootProps = {
  store: any
  history: History<any>
}

export default (props: RootProps) => {
  const { store, history } = props
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <LP messages={translationMessages}>
          <ConnectedRouter history={history}>
            <App/>
          </ConnectedRouter>
        </LP>
      </MuiThemeProvider>
    </Provider>
  )
}
