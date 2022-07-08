/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SettingsCard } from '../../SettingsCard'
import styled from 'styled-components'
import themes from '../../../../../commons/themes'
import { Switch } from '../../../../../Components/Switch/Switch'
import { Slider } from '../../../../../Components/Slider/Slider'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import { configs } from '../../../../../commons/config'
import { tequila } from '../../../../../api/tequila'
import conversions from '../../../../../commons/conversions'
import errors from '../../../../../commons/errors'

const GroupedTitle = styled.div`
  display: flex;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const LimitTarget = styled.div`
  color: ${themes.current().colorKey};
  font-size: ${themes.current().fontSizeBig};
  font-weight: 700;
  margin-left: 20px;
`

export const BandwidthControl = () => {
  const config = useAppSelector(selectors.configSelector)
  const shapingEnabled = configs.isTrafficShapingEnabled(config)
  const configShapingKBps = configs.trafficShapingBandwidthKBps(config)

  const [loading, setLoading] = useState<boolean>(true)
  const [bandwidthMBps, setBandwidthMBps] = useState<number>(150)

  const handleChange = (v: number | number[]) => {
    setBandwidthMBps(v as number)
  }

  const enableShaping = async (value: boolean) => {
    setLoading(true)
    try {
      await tequila.setTrafficShaping(value, conversions.kbps(bandwidthMBps))
    } catch (err: any) {
      errors.parseToastError(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    setBandwidthMBps(conversions.mbps(configShapingKBps))
    setLoading(false)
  }, [])

  return (
    <SettingsCard
      loading={loading}
      title={
        <Row>
          <GroupedTitle>
            Limit bandwidth to<LimitTarget>{bandwidthMBps} Mb/s</LimitTarget>
          </GroupedTitle>
          <Switch checked={shapingEnabled} onChange={enableShaping} disabled={loading} />
        </Row>
      }
    >
      <Slider
        min={15}
        max={1000}
        value={bandwidthMBps}
        onChange={handleChange}
        marks={{
          15: '15 Mb/s',
          1000: '1000 Mb/s',
        }}
      />
    </SettingsCard>
  )
}
