/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LayoutRow } from '../../Components/Layout/Layout'
import { CircleIndicator } from '../../SettingsPage/Tabs/Advanced/CircleIndicator'
import { Variant } from '../../SettingsPage/Tabs/Advanced/types'
import { CenteredRow } from '../Components'

const IndicatorsBook = () => {
  return (
    <CenteredRow>
      {[12, 16, 20, 24, 28, 34, 38, 42].map((s) => (
        <LayoutRow key={`cid-${s}-s`}>
          {['ok', 'warning', 'error'].map((v) => (
            <CircleIndicator key={`${v}-${s}`} variant={v as Variant} size={s} />
          ))}
        </LayoutRow>
      ))}
    </CenteredRow>
  )
}

export default IndicatorsBook
