/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'
import { PanelCard } from '../PanelCard'
import Label from '../../../../components/Typography/Label'
import Text from '../../../../components/Typography/Text'
import Toggle from '../../../../components/Toggle/Toggle'
import { configs } from '../../../../commons/config'
import { useAppSelector } from '../../../../commons/hooks'
import FEATURES from '../../../../commons/features'
import complexActions from '../../../../redux/complex.actions'
import { selectors } from '../../../../redux/selectors'

const capitalize = (s: string) => {
  return s[0].toUpperCase() + s.slice(1)
}
export const FeatureToggle = () => {
  const config = useAppSelector(selectors.currentConfig)
  const [loading, setLoading] = useState<boolean>(false)

  const toggle = async (name: string) => {
    setLoading(true)
    const isEnabled = configs.isFeatureEnabled(config, name)
    const enabledFeatures = configs.uiFeatures(config)

    try {
      if (isEnabled) {
        await complexActions.setFeatures(enabledFeatures.filter((f) => f !== name))
      } else {
        await complexActions.setFeatures([...enabledFeatures, name])
      }
    } finally {
      setLoading(false)
    }
  }

  const featureList = Object.keys(FEATURES).map((f) => {
    // @ts-ignore
    const feature = FEATURES[f]
    const isEnabled = configs.isFeatureEnabled(config, feature.name)
    return (
      <div className="flex justify-between items-center" key={feature.name}>
        <div>
          <Label value={capitalize(feature.name)} />
          <Text value={feature.description} className="text-gray-550" />
        </div>
        <Toggle onChange={() => toggle(feature.name)} checked={isEnabled} />
      </div>
    )
  })

  return (
    <PanelCard title="Toggle features" isLoading={loading}>
      <div className="flex flex-col gap-6">{featureList}</div>
    </PanelCard>
  )
}
