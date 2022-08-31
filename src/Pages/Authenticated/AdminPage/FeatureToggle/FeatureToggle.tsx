/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'
import { configs } from '../../../../commons/config'
import FEATURES from '../../../../commons/features'
import { selectors } from '../../../../redux/selectors'
import { useAppSelector } from '../../../../commons/hooks'
import { Button } from '../../../../Components/Inputs/Button'
import styled from 'styled-components'
import complexActions from '../../../../redux/complex.actions'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: 15px;

  overflow-y: auto;
`
const Feature = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 2fr 1fr;
  justify-content: space-between;
  width: 500px;
  gap: 15px;
`
const Enabled = styled.div``
const Info = styled.div`
  display: flex;
  flex-direction: column;
`
const Name = styled.div`
  margin-bottom: 5px;
`
const Description = styled.div``

export const FeatureToggle = () => {
  const config = useAppSelector(selectors.currentConfig)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const toggle = async (name: string) => {
    setIsLoading(true)
    const isEnabled = configs.isFeatureEnabled(config, name)
    const enabledFeatures = configs.uiFeatures(config)

    try {
      if (isEnabled) {
        await complexActions.setFeatures(enabledFeatures.filter((f) => f !== name))
      } else {
        await complexActions.setFeatures([...enabledFeatures, name])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const featureList = Object.keys(FEATURES).map((f) => {
    const feature = FEATURES[f]
    const isEnabled = configs.isFeatureEnabled(config, feature.name)
    return (
      <Feature key={feature.name}>
        <Enabled>{isEnabled && 'X'}</Enabled>
        <Info>
          <Name>{feature.name}</Name>
          <Description>{feature.description}</Description>
        </Info>
        <Button onClick={() => toggle(feature.name)} loading={isLoading} variant="outlined" label="Toggle" />
      </Feature>
    )
  })

  return <Content>{featureList}</Content>
}
