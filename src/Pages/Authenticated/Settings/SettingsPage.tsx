/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from 'mysterium-vpn-js/lib/config/config'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { tequila } from '../../../api/wrapped-calls'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/settings/logo.svg'
import { configParser } from '../../../commons/config'
import { parseError } from '../../../commons/error.utils'
import FEATURES from '../../../commons/features'
import { toastError } from '../../../commons/toast.utils'
import { PowerOffButton } from '../../../Components/PowerOffButton/PowerOffButton'
import { selectors } from '../../../redux/selectors'
import { Layout } from '../Layout'
import { Advanced } from './Components/Advanced/Advanced'
import IdentityInformation from './Components/IdentityInformation'

import MMN from './Components/MMN'
import PasswordChange from './Components/PasswordChange'
import Version from './Components/Version'

import styles from './SetingsPage.module.scss'

const { api } = tequila

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
    Promise.all([api.getMMNApiKey(), api.healthCheck(15_000), api.defaultConfig()])
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
      topRight={
        <div className={styles.topRight}>
          {configParser.isFeatureEnabled(config, FEATURES.RESTART.name) && (
            <div className={styles.powerOff}>
              <PowerOffButton />
            </div>
          )}
          <Version nodeVersion={state.nodeVersion} nodeCommit={state.nodeCommit} />
        </div>
      }
      isLoading={state.isLoading}
      main={
        <div className={styles.settings}>
          <div className={styles.settingsCard}>
            <Card title="Identity">
              <IdentityInformation identity={identity} />
            </Card>
          </div>

          <div className={styles.settingsCard}>
            <Card title="WebUI security">
              <PasswordChange />
            </Card>
            {/*<Card title="Settlement Settings">*/}
            {/*  <SettlementSettings />*/}
            {/*</Card>*/}
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
