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
import styled from 'styled-components'
import complexActions from '../../../../redux/complex.actions'
import { Switch } from '../../../../Components/Switch/Switch'
import { CircularSpinner } from '../../../../Components/CircularSpinner/CircularSpinner'
import { themeCommon } from '../../../../theme/themeCommon'

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: ${themeCommon.colorDarkBlue}6A;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Spinner = styled(CircularSpinner)`
  width: 50px;
  height: 50px;
  border: 6px solid ${themeCommon.colorWhite};
  z-index: 1001;
`
const Content = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bgSettingsCard};
  gap: 15px;
  margin-left: 50px;
`
const Feature = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Name = styled.div`
  margin-bottom: 5px;
`
const Description = styled.div``
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
    const feature = FEATURES[f]
    const isEnabled = configs.isFeatureEnabled(config, feature.name)
    return (
      <Feature key={feature.name}>
        <Row>
          <Name>{capitalize(feature.name)}</Name>
          <Switch onChange={() => toggle(feature.name)} checked={isEnabled} />
        </Row>
        <Description>{feature.description}</Description>
      </Feature>
    )
  })

  return (
    <Content>
      {loading && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
      {featureList}
    </Content>
  )
}
