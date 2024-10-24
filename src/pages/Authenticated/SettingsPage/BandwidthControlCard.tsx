/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useState } from 'react'
import semver from 'semver/preload'
import Card from '../../../components/Cards/Card'
import { Slider } from '../../../components/Slider/Slider'
import Toggle from '../../../components/Toggle/Toggle'
import Label from '../../../components/Typography/Label'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import { selectors } from '../../../redux/selectors'
import complexActions from '../../../redux/complex.actions'
import { useAppSelector } from '../../../commons/hooks'
import conversions from '../../../commons/conversions'
import errors from '../../../commons/errors'
import { configs } from '../../../commons/config'
import { tequila } from '../../../api/tequila'

const ONE_SECOND_MS = 1000

export const BandwidthControlCard = () => {
  const config = useAppSelector(selectors.currentConfig)
  const { id } = useAppSelector(selectors.currentIdentity)
  const shapingEnabled = configs.isTrafficShapingEnabled(config)
  const configShapingKBps = configs.trafficShapingBandwidthKBps(config)
  const { version } = useAppSelector(selectors.healthCheck)

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

      let isNewVersion = version === 'source.dev-build' || semver.satisfies(version, '>=1.23.0')
      if (!isNewVersion || !configs.isUserspaceProvider(config)) {
        await tequila.restartRunningServices(id)
      }
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
    <Card fluid isLoading={loading}>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Label value="Limit bandwidth to"></Label>
          <Label value={`${bandwidthMBps} Mb/s`} className="text-pink-525" />
        </div>
        <Toggle checked={shapingEnabled} onChange={() => setShowConfirmation(true)} disabled={loading} />
      </div>
      <div className="mt-6 mb-10">
        <Slider
          min={15}
          max={1000}
          value={bandwidthMBps}
          onChange={handleChange}
          onChangeComplete={async (mbps) => {
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
      </div>
      <ConfirmationModal
        title="Restart Services"
        message="To enable or change bandwidth limit all running services need to be restarted"
        isOpen={showConfirmation}
        confirmLabel="Restart"
        onConfirm={async () => {
          setShowConfirmation(false)
          await toggleShaping(
            conversions.mbps(configShapingKBps) === bandwidthMBps ? !shapingEnabled : shapingEnabled,
            bandwidthMBps,
          )
        }}
        onCancel={() => {
          setBandwidthMBps(conversions.mbps(configShapingKBps))
          setShowConfirmation(false)
        }}
      />
    </Card>
  )
}

export default BandwidthControlCard
