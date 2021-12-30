/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Route, Redirect } from 'react-router-dom'

import { LOGIN, ON_BOARDING_HOME } from '../constants/routes'

interface Props {
  component: (props: any) => any
  loggedIn: boolean
  needsOnBoarding?: boolean
  path: string
}

const redirectComponent = (needsOnboarding: boolean, loggedIn: boolean): JSX.Element | null => {
  if (!loggedIn) {
    return <Redirect to={LOGIN} />
  }
  if (needsOnboarding) {
    return <Redirect to={ON_BOARDING_HOME} />
  }

  return null
}

const ProtectedRoute = ({ component, loggedIn, needsOnBoarding = false, ...rest }: Props): JSX.Element => {
  const redirect = redirectComponent(needsOnBoarding, loggedIn)

  return (
    <Route
      {...rest}
      render={(props) => {
        return redirect || component(props)
      }}
    />
  )
}

export default ProtectedRoute
