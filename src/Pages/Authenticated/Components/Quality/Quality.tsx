/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QualityBarsIcon } from '../../../../Components/Icons/Icons'
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'
import { HeaderItem } from '../../../../Components/Header/HeaderItem'

export const Quality = () => {
  return (
    <HeaderItem
      title="Quality"
      content={
        <>
          <QualityBarsIcon $quality={2} />
          <Tooltip content={'Indicates averaged quality as seen by consumers in your continent'} />
        </>
      }
    />
  )
}
