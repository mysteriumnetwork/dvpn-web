/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useAppSelector, useFetch } from '../../../../commons/hooks'
import { tequila } from '../../../../api/tequila'
import { ReactComponent as WarningSVG } from '../../../../assets/images/toasts/warning.svg'
import { HeaderItem } from '../../../../Components/Header/HeaderItem'
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'
import { selectors } from '../../../../redux/selectors'

export const MonitoringStatus = () => {
  const services = useAppSelector(selectors.runningServices)
  const anyOnline = services.length > 0

  const [data = { status: 'pending' }] = useFetch(() => tequila.api.nodeMonitoringStatus())

  if (anyOnline && data.status === 'failed') {
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

  return <></>
}
