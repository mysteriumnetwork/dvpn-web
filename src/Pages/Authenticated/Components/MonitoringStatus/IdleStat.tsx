/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useFetch } from '../../../../commons/hooks'
import { tequila } from '../../../../api/tequila'
import { ReactComponent as WarningSVG } from '../../../../assets/images/toasts/warning.svg'
import { HeaderItem } from '../../../../Components/Header/HeaderItem'
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'

export const MonitoringStatus = () => {
  const [data = { status: 'pending' }, loading] = useFetch(() => tequila.api.nodeMonitoringStatus())

  if (data.status !== 'failed') {
    return <></>
  }

  return (
    <HeaderItem
      title="Monitoring"
      content={
        <>
          <WarningSVG />
          <Tooltip content="Your node has failed monitoring agent check. Please check your internet connection and router settings." />
        </>
      }
    />
  )
}