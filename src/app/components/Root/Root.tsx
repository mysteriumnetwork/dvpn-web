import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { MuiThemeProvider } from '@material-ui/core/styles'
import LP from '../../../language'
import { translationMessages } from '../../../language/i18n'
import App from './App'
import muiTheme from '../../../mui-theme'

type Props = {
  store: any
  history: History<any>
}

const Root = (props: Props) => {
  const { store, history } = props
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <LP messages={translationMessages}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </LP>
      </MuiThemeProvider>
    </Provider>
  )
}

export default Root
