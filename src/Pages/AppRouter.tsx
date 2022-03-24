/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AppState } from 'mysterium-vpn-js'
import React, { Dispatch, useEffect, useLayoutEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { tequila } from '../api/wrapped-calls'
import { parseToastError } from '../commons/toast.utils'
import { localStorageKeys } from '../constants/local_storage_keys'
import {
  DASHBOARD,
  ERROR,
  HOME,
  LOGIN,
  NOT_FOUND,
  ON_BOARDING_HOME,
  SESSIONS,
  SESSIONS_SIDE,
  SETTINGS,
  VERSION_MANAGEMENT,
  WALLET,
} from '../constants/routes'
import {
  fetchChainSummaryAsync,
  fetchConfigAsync,
  fetchFeesAsync,
  fetchIdentityAsync,
  updateTermsStoreAsync,
} from '../redux/app.async.actions'
import { Auth, isLoggedIn, updateAuthenticatedStore, updateAuthFlowLoadingStore } from '../redux/app.slice'
import { EMPTY_IDENTITY, selectors } from '../redux/selectors'
import { sseAppStateStateChanged } from '../redux/sse.slice'
import { RootState } from '../redux/store'
import ConnectToSSE from '../sse/server-sent-events'

import './App.scss'
import AuthenticatedPage from './Authenticated/AuthenticatedPage'
import PageNotFound from './Error/PageNotFound'
import RestartNode from './Error/RestartNode'
import LoginPage from './Login/LoginPage'
import OnBoardingPage from './Onboarding/OnBoardingPage'

import ProtectedRoute from './ProtectedRoute'

interface Props {
  actions: {
    fetchIdentityAsync: () => void
    fetchConfigAsync: () => void
    updateTermsStoreAsync: () => void
    fetchFeesAsync: () => void
    fetchChainSummaryAsync: () => void
    updateAuthenticatedStore: (auth: Auth) => void
    updateAuthFlowLoadingStore: (loading: boolean) => void
    sseAppStateStateChanged: (state: AppState) => void
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    actions: {
      fetchIdentityAsync: async () => dispatch(fetchIdentityAsync()),
      fetchConfigAsync: async () => dispatch(fetchConfigAsync()),
      updateTermsStoreAsync: async () => dispatch(updateTermsStoreAsync()),
      fetchFeesAsync: async () => dispatch(fetchFeesAsync()),
      fetchChainSummaryAsync: async () => dispatch(fetchChainSummaryAsync()),
      updateAuthenticatedStore: async (auth: Auth) => dispatch(updateAuthenticatedStore(auth)),
      updateAuthFlowLoadingStore: async (loading: boolean) => dispatch(updateAuthFlowLoadingStore(loading)),
      sseAppStateStateChanged: (state: AppState) => dispatch(sseAppStateStateChanged(state)),
    },
  }
}

const redirectTo = (needsOnboarding: boolean, loggedIn: boolean): JSX.Element => {
  if (!loggedIn) {
    return <Redirect to={LOGIN} />
  }
  if (needsOnboarding) {
    return <Redirect to={ON_BOARDING_HOME} />
  }

  return <Redirect to={DASHBOARD} />
}

const AppRouter = ({ actions }: Props) => {
  const loading = useSelector<RootState, boolean>(({ app }) => app.loading)
  const loggedIn = useSelector<RootState, boolean>(({ app }) => isLoggedIn(app.auth))
  const identity = useSelector(selectors.currentIdentitySelector)
  const onBoarding = useSelector(selectors.onBoardingStateSelector)

  const authenticatedActions = async (defaultCredentials: boolean) => {
    await actions.updateAuthenticatedStore({
      authenticated: true,
      withDefaultCredentials: defaultCredentials,
    })
    await actions.updateTermsStoreAsync()
    await actions.fetchIdentityAsync()
    await actions.fetchConfigAsync()
    await actions.fetchFeesAsync()
    await actions.fetchChainSummaryAsync()
  }

  const loadIntercomCookie = () => {
    const intercomUserId = localStorage.getItem(localStorageKeys.INTERCOM_USER_ID)
    if (intercomUserId !== null && intercomUserId !== '') {
      // @ts-ignore
      window.Intercom('boot', {
        anonymous_id: intercomUserId,
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (identity.id !== EMPTY_IDENTITY.id) {
          await tequila.refreshBeneficiary(identity.id)
        }
      } catch (e: any) {
        parseToastError(e)
      }
    })()
  }, [identity.id])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     try {
  //       actions.fetchFeesAsync()
  //     } catch (e: any) {
  //       console.log(e)
  //     }
  //   }, 30_000)
  //   return () => clearInterval(interval)
  // }, [])

  useLayoutEffect(() => {
    const blockingCheck = async () => {
      let isDefaultPassword = await tequila.loginWithDefaultCredentials()
      let isAuthenticated = isDefaultPassword

      //check if there is a token cookie saved
      if (!isAuthenticated) {
        isAuthenticated = await tequila.isUserAuthenticated()
      }

      if (isAuthenticated) {
        await authenticatedActions(isDefaultPassword)
      }

      await actions.updateAuthFlowLoadingStore(false)
    }
    blockingCheck()
  }, [])

  useEffect(() => {
    if (!loggedIn) {
      return
    }

    loadIntercomCookie()

    ConnectToSSE((state: AppState) => actions.sseAppStateStateChanged(state))
  }, [loggedIn])

  const authenticatedPage = (props: any) => {
    return <AuthenticatedPage identity={identity} {...props} />
  }

  if (loading) {
    return <></>
  }

  return (
    <Switch>
      <Route exact path={HOME}>
        {redirectTo(onBoarding.needsOnBoarding, loggedIn)}
      </Route>
      <Route
        exact
        path={LOGIN}
        render={() => {
          return !loggedIn ? (
            <LoginPage onSuccessLogin={() => authenticatedActions(false)} />
          ) : (
            <Redirect to={DASHBOARD} />
          )
        }}
      />
      <Route
        path={ON_BOARDING_HOME}
        render={(props) => {
          return onBoarding.needsOnBoarding ? <OnBoardingPage /> : <Redirect to={DASHBOARD} />
        }}
      />
      <Route exact path={ERROR} component={RestartNode} />
      <Route path={NOT_FOUND} component={PageNotFound} />

      <ProtectedRoute
        path={DASHBOARD}
        needsOnBoarding={onBoarding.needsOnBoarding}
        loggedIn={loggedIn}
        component={authenticatedPage}
      />
      <ProtectedRoute
        path={SESSIONS}
        needsOnBoarding={onBoarding.needsOnBoarding}
        loggedIn={loggedIn}
        component={authenticatedPage}
      />
      <ProtectedRoute
        path={SETTINGS}
        needsOnBoarding={onBoarding.needsOnBoarding}
        loggedIn={loggedIn}
        component={authenticatedPage}
      />
      <ProtectedRoute
        path={SESSIONS_SIDE}
        needsOnBoarding={onBoarding.needsOnBoarding}
        loggedIn={loggedIn}
        component={authenticatedPage}
      />
      <ProtectedRoute
        path={WALLET}
        needsOnBoarding={onBoarding.needsOnBoarding}
        loggedIn={loggedIn}
        component={authenticatedPage}
      />
      <ProtectedRoute path={VERSION_MANAGEMENT} loggedIn={loggedIn} component={authenticatedPage} />

      <Redirect from="*" to={NOT_FOUND} />
    </Switch>
  )
}

export default connect(null, mapDispatchToProps)(AppRouter)
