/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LayoutRow } from '../../Components/Layout/Layout'
import { CircleIndicator } from '../../SettingsPage/Tabs/Advanced/CircleIndicator'
import { Variant } from '../../SettingsPage/Tabs/Advanced/types'

const IndicatorsBook = () => {
  return (
    <>
      {[12, 16, 20, 24].map((s) => (
        <LayoutRow key={`cid-${s}-s`}>
          {['ok', 'warning', 'error'].map((v) => (
            <CircleIndicator key={`${v}-${s}`} variant={v as Variant} size={s} />
          ))}
        </LayoutRow>
      ))}
    </>
  )
}

export default IndicatorsBook
