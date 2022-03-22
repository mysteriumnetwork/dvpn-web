/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { tequila } from '../../../../api/wrapped-calls'
import { configParser } from '../../../../commons/config'
import { parseAndToastError } from '../../../../commons/error.utils'
import { toastSuccess } from '../../../../commons/toast.utils'
import Button from '../../../../Components/Buttons/Button'
import { InputGroup } from '../../../../Components/InputGroups/InputGroup'
import MystSlider from '../../../../Components/MystSlider/MystSlider'
import { selectors } from '../../../../redux/selectors'
import styles from './SettlementSettings.module.scss'

const { setUserConfig } = tequila

export const SettlementSettings = () => {
  const config = useSelector(selectors.configSelector)
  const configThreshold = configParser.zeroStakeSettlementThreshold(config)

  const [threshold, setThreshold] = useState<number>(configThreshold)
  useEffect(() => setThreshold(configThreshold), [configThreshold])

  const handleThreshold = (event: React.ChangeEvent<any>, value: number) => setThreshold(value)

  const handleSave = async () => {
    try {
      await setUserConfig({ payments: { 'zero-stake-unsettled-amount': threshold } })
      toastSuccess('Settlement threshold updated')
    } catch (err: any) {
      parseAndToastError(err)
    }
  }

  return (
    <div className={styles.settings}>
      <InputGroup label="Auto-settlement threshold">
        <MystSlider
          label=""
          value={threshold}
          handleChange={handleThreshold}
          step={0.1}
          min={0.9}
          max={5}
          marks={[
            { value: 0.9, label: '0.9' },
            { value: 5, label: '5' },
          ]}
        />
      </InputGroup>
      <div className={styles.controls}>
        <Button onClick={handleSave} disabled={configThreshold === threshold}>
          Save
        </Button>
      </div>
    </div>
  )
}
