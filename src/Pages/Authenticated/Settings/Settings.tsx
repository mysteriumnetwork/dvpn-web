/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularProgress } from '@material-ui/core'
import { Identity } from 'mysterium-vpn-js'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { tequilapiClient } from '../../../api/TequilApiClient'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/settings/logo.svg'
import * as config from '../../../commons/config'
import { parseError, parseMMNError } from '../../../commons/error.utils'
import Header from '../../../Components/Header'
import { currentIdentity } from '../../../redux/app.slice'
import { RootState } from '../../../redux/store'
import IdentityBackup from './Components/IdentityBackup'

import MMN from './Components/MMN'
import PasswordChange from './Components/PasswordChange'
import PayoutAddress from './Components/PayoutAddress'
import Version from './Components/Version'

import './Setings.scss'

interface CardProps {
  title: string
  children: any
}

const Card = ({ title, children }: CardProps) => (
  <>
    <p className="heading">{title}</p>
    <div className="content">{children}</div>
  </>
)

interface StateInterface {
  apiKey: string
  nodeVersion?: string
  loading: boolean
}

const Settings = () => {
  const { enqueueSnackbar } = useSnackbar()

  const identity = useSelector<RootState, Identity | undefined>(({ app, sse }) =>
    currentIdentity(app.currentIdentityRef, sse.appState?.identities),
  )
  const mmnWebAddress = useSelector<RootState, string>(({ app }) => config.mmnWebAddress(app.config))

  const [state, setState] = React.useState<StateInterface>({
    apiKey: '',
    loading: true,
  })

  useEffect(() => {
    Promise.all([tequilapiClient.getMMNApiKey(), tequilapiClient.healthCheck(15_000)])
      .then(([mmn, healthcheck]) => {
        setState((cs) => ({
          ...cs,
          apiKey: mmn.apiKey,
          nodeVersion: healthcheck.version,
          loading: false,
        }))
      })
      .catch((err) => enqueueSnackbar(parseMMNError(err) || parseError(err), { variant: 'error' }))
  }, [identity?.id])

  if (state.loading) {
    return <CircularProgress className="spinner" disableShrink />
  }

  return (
    <div className="main">
      <div className="main-block">
        <div className="settings-header">
          <Header logo={Logo} name="Settings" />
          <Version nodeVersion={state.nodeVersion} />
        </div>
        <div className="settings">
          <div className="settings__block">
            <Card title="Identity">
              <IdentityBackup identity={identity?.id || ''} />
            </Card>

            <Card title="Bounty Payout Address">
              <PayoutAddress identity={identity} />
            </Card>
          </div>

          <div className="settings__block">
            <Card title="WebUI security">
              <PasswordChange />
            </Card>
          </div>

          <div className="settings__block">
            <Card title="MMN integration">
              <MMN mmnUrl={mmnWebAddress} apiKey={state.apiKey} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
