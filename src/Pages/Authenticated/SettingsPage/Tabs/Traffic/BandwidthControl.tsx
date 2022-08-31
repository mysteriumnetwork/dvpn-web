/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SettingsCard } from '../../SettingsCard'
import styled from 'styled-components'
import { Switch } from '../../../../../Components/Switch/Switch'
import { Slider } from '../../../../../Components/Slider/Slider'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../../commons/hooks'
import { selectors } from '../../../../../redux/selectors'
import { configs } from '../../../../../commons/config'
import { tequila } from '../../../../../api/tequila'
import conversions from '../../../../../commons/conversions'
import errors from '../../../../../commons/errors'
import { themeCommon } from '../../../../../theme/themeCommon'
import { ConfirmationDialog } from '../../../../../Components/ConfirmationDialog/ConfirmationDialog'
import complexActions from '../../../../../redux/complex.actions'

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
  color: ${themeCommon.colorKey};
  font-size: ${themeCommon.fontSizeBig};
  font-weight: 700;
  margin-left: 20px;
`

const ONE_SECOND_MS = 1000

export const BandwidthControl = () => {
  const config = useAppSelector(selectors.currentConfig)
  const { id } = useAppSelector(selectors.currentIdentity)
  const shapingEnabled = configs.isTrafficShapingEnabled(config)
  const configShapingKBps = configs.trafficShapingBandwidthKBps(config)

  const [loading, setLoading] = useState<boolean>(true)
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [bandwidthMBps, setBandwidthMBps] = useState<number>(150)

  const handleChange = (v: number | number[]) => setBandwidthMBps(v as number)

  const changeShapingConfig = async (enabled: boolean, bandwidthMBps: number) =>
    await complexActions.setTrafficShaping(enabled, conversions.kbps(bandwidthMBps))

  const toggleShaping = async (checked: boolean, mbps: number) => {
    setLoading(true)
    try {
      await changeShapingConfig(checked, mbps)
      await tequila.restartRunningServices(id)
    } catch (err: any) {
      errors.parseToastError(err)
    }
    setTimeout(() => setLoading(false), ONE_SECOND_MS)
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
          <Switch checked={shapingEnabled} onChange={() => setShowConfirmation(true)} disabled={loading} />
        </Row>
      }
    >
      <Slider
        min={15}
        max={1000}
        value={bandwidthMBps}
        onChange={handleChange}
        onAfterChange={async (mbps) => {
          if (!shapingEnabled) {
            await changeShapingConfig(false, mbps as number)
            return
          }
          setShowConfirmation(true)
        }}
        marks={{
          15: '15 Mb/s',
          1000: '1000 Mb/s',
        }}
      />
      <ConfirmationDialog
        title="Restart Services"
        message="To enable or change bandwidth limit all running services need to be restarted"
        show={showConfirmation}
        onConfirm={async () => {
          setShowConfirmation(false)
          await toggleShaping(!shapingEnabled, bandwidthMBps)
        }}
        onCancel={() => {
          setBandwidthMBps(conversions.mbps(configShapingKBps))
          setShowConfirmation(false)
        }}
      />
    </SettingsCard>
  )
}
