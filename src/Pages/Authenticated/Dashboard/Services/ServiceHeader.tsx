/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import SecurityIcon from '@material-ui/icons/Security'
import PublicIcon from '@material-ui/icons/Public'
import { Chip } from '@material-ui/core'

import { ReactComponent as OpenVpnIcon } from '../../../../assets/images/ovpn-icon.svg'
import { ReactComponent as WireGuardIcon } from '../../../../assets/images/wg-icon.svg'
import { ServiceType } from '../../../../commons'

import './ServiceHeader.scss'

const icons = (type: ServiceType): unknown => {
  switch (type) {
    case ServiceType.OPENVPN:
      return <OpenVpnIcon />
    case ServiceType.WIREGUARD:
      return <WireGuardIcon />
  }
  return <WireGuardIcon />
}

const displayName = (type: ServiceType): string => {
  switch (type) {
    case ServiceType.OPENVPN:
      return ServiceType.OPENVPN
    case ServiceType.WIREGUARD:
      return 'WG' // copyright stuff
  }
  return 'Unknown'
}

interface Props {
  type: ServiceType
  running: boolean
  whitelisted: boolean
}

const ServiceHeader = ({ type, running, whitelisted }: Props): JSX.Element => {
  return (
    <div className="service-header">
      <div className="service-header__logo">
        {icons(type)}
        <div className={running ? 'status-dot on' : 'status-dot off'} />
      </div>
      <div className="service-header__name">
        <p className="name">{displayName(type)}</p>
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
