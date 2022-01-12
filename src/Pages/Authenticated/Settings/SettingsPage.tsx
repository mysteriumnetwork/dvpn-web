/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from 'mysterium-vpn-js/lib/config/config'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { tequilaClient } from '../../../api/tequila-client'
import { tequila } from '../../../api/wrapped-calls'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/settings/logo.svg'
import { configParser } from '../../../commons/config'
import { parseError } from '../../../commons/error.utils'
import { toastError } from '../../../commons/toast.utils'
import { Advanced } from './Components/Advanced/Advanced'
import IdentityInformation from './Components/IdentityInformation'

import MMN from './Components/MMN'
import PasswordChange from './Components/PasswordChange'
import PayoutAddress from './Components/PayoutAddress'

import styles from './SetingsPage.module.scss'
import { selectors } from '../../../redux/selectors'
import { Layout } from '../Layout'
import Version from './Components/Version'

interface CardProps {
  title: string
  children: any
}

const Card = ({ title, children }: CardProps) => (
  <>
    <p className={styles.heading}>{title}</p>
    <div className={styles.content}>{children}</div>
  </>
)

interface StateInterface {
  apiKey: string
  nodeVersion?: string
  defaultConfig: Config
  isLoading: boolean
  nodeCommit?: string
}

const SettingsPage = () => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const config = useSelector(selectors.configSelector)

  const [state, setState] = React.useState<StateInterface>({
    apiKey: '',
    isLoading: true,
    defaultConfig: { data: {} },
  })

  useEffect(() => {
    Promise.all([tequilaClient.getMMNApiKey(), tequilaClient.healthCheck(15_000), tequilaClient.defaultConfig()])
      .then(([mmn, healthcheck, defaultConfig]) => {
        setState((cs) => ({
          ...cs,
          apiKey: mmn.apiKey,
          nodeVersion: healthcheck.version,
          isLoading: false,
          defaultConfig: defaultConfig,
          nodeCommit: healthcheck.buildInfo.commit,
        }))
      })
      .catch((err) => toastError(parseError(err)))
  }, [identity?.id])

  const mmnWebAddress = configParser.mmnWebAddress(config)

  return (
    <Layout
      title="Settings"
      logo={<Logo />}
      topRight={<Version nodeVersion={state.nodeVersion} nodeCommit={state.nodeCommit} />}
      isLoading={state.isLoading}
      main={
        <div className={styles.settings}>
          <div className={styles.settingsCard}>
            <Card title="Identity">
              <IdentityInformation identity={identity} />
            </Card>

            <Card title="Default Withdrawal Address">
              <PayoutAddress identity={identity} />
            </Card>
          </div>

          <div className={styles.settingsCard}>
            <Card title="WebUI security">
              <PasswordChange />
            </Card>
          </div>

          <div className={styles.settingsCard}>
            <Card title="Mystnodes.com integration">
              <MMN mmnUrl={mmnWebAddress} apiKey={state.apiKey} />
            </Card>
            <Card title="Advanced Settings">
              <Advanced config={config} defaultConfig={state.defaultConfig} onSave={tequila.setUserConfig} />
            </Card>
          </div>
        </div>
      }
    />
  )
}

export default SettingsPage
