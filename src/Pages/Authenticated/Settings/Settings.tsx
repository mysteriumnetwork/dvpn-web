/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularProgress } from '@material-ui/core'
import { Identity } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { api } from '../../../api/Api'
import { setUserConfig } from '../../../api/ApiWrapper'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/settings/logo.svg'
import * as config from '../../../commons/config'
import { parseError } from '../../../commons/error.utils'
import { toastError } from '../../../commons/toast.utils'
import Header from '../../../Components/Header'
import { currentIdentity } from '../../../redux/app.slice'
import { RootState } from '../../../redux/store'
import { Advanced } from './Components/Advanced/Advanced'
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
  defaultConfig: Config
  loading: boolean
  nodeCommit?: string
}

const Settings = () => {
  const identity = useSelector<RootState, Identity | undefined>(({ app, sse }) =>
    currentIdentity(app.currentIdentityRef, sse.appState?.identities),
  )
  const cfg = useSelector<RootState, Config | undefined>(({ app }) => app.config)

  const [state, setState] = React.useState<StateInterface>({
    apiKey: '',
    loading: true,
    defaultConfig: { data: {} },
  })

  useEffect(() => {
    Promise.all([api.getMMNApiKey(), api.healthCheck(15_000), api.defaultConfig()])
      .then(([mmn, healthcheck, defaultConfig]) => {
        setState((cs) => ({
          ...cs,
          apiKey: mmn.apiKey,
          nodeVersion: healthcheck.version,
          loading: false,
          defaultConfig: defaultConfig,
          nodeCommit: healthcheck.buildInfo.commit,
        }))
      })
      .catch((err) => toastError(parseError(err)))
  }, [identity?.id])

  if (state.loading || !cfg) {
    return <CircularProgress className="spinner" disableShrink />
  }

  const mmnWebAddress = config.mmnWebAddress(cfg)

  return (
    <div className="main">
      <div className="main-block">
        <div className="settings-header">
          <Header logo={Logo} name="Settings" />
          <Version nodeVersion={state.nodeVersion} nodeCommit={state.nodeCommit} />
        </div>
        <div className="settings">
          <div className="settings__block">
            <Card title="Identity">
              <IdentityBackup identity={identity?.id || ''} />
            </Card>

            <Card title="Default Withdrawal Address">
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
            <Card title="Advanced Settings">
              <Advanced config={cfg} defaultConfig={state.defaultConfig} onSave={setUserConfig} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
