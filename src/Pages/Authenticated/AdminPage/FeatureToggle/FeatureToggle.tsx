/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'
import { tequila } from '../../../../api/tequila'
import { configs } from '../../../../commons/config'
import FEATURES from '../../../../commons/features'
import { selectors } from '../../../../redux/selectors'
import styles from './FeatureToggle.module.scss'
import { useAppSelector } from '../../../../commons/hooks'
import { Button } from '../../../../Components/Inputs/Button'

export const FeatureToggle = () => {
  const { setFeatures } = tequila
  const config = useAppSelector(selectors.currentConfig)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const toggle = async (name: string) => {
    setIsLoading(true)
    const isEnabled = configs.isFeatureEnabled(config, name)
    const enabledFeatures = configs.uiFeatures(config)

    try {
      if (isEnabled) {
        await setFeatures(enabledFeatures.filter((f) => f !== name))
      } else {
        await setFeatures([...enabledFeatures, name])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const featureList = Object.keys(FEATURES).map((f) => {
    const feature = FEATURES[f]
    const isEnabled = configs.isFeatureEnabled(config, feature.name)
    return (
      <div key={feature.name} className={styles.feature}>
        <div className={styles.enabled}>{isEnabled && <div>X</div>}</div>
        <div className={styles.info}>
          <p className={styles.name}>{feature.name}</p>
          <p className={styles.description}>{feature.description}</p>
        </div>
        <Button onClick={() => toggle(feature.name)} loading={isLoading} variant="outlined" label="Toggle" />
      </div>
    )
  })

  return <div className={styles.features}>{featureList}</div>
}
