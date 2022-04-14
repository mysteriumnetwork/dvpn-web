/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Chip } from '@material-ui/core'
import PublicIcon from '@material-ui/icons/Public'
import SecurityIcon from '@material-ui/icons/Security'
import { ReactComponent as WireGuardIcon } from '../../../../assets/images/wg-icon.svg'

import './ServiceHeader.scss'

interface Props {
  running: boolean
  whitelisted: boolean
}

const ServiceHeader = ({ running, whitelisted }: Props) => {
  return (
    <div className="service-header">
      <div className="service-header__logo">
        <WireGuardIcon />
        <div className={running ? 'status-dot on' : 'status-dot off'} />
      </div>
      <div className="service-header__name">
        <p className="name">WG</p>
        <p className="type">VPN and Data scraping</p>
      </div>
      <div className="flex-grow" />
      <div>
        {whitelisted ? (
          <Chip avatar={<SecurityIcon />} variant="outlined" label="Whitelisted" />
        ) : (
          <Chip avatar={<PublicIcon />} variant="outlined" label="Public" />
        )}
      </div>
    </div>
  )
}

export default ServiceHeader
