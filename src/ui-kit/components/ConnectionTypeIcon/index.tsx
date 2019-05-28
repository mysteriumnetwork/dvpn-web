import React from 'react'
import classNames from 'classnames'
import { ServiceTypes } from '../../../api/data/service'
import './styles.scss'

type Props = {
  type: string
  active?: boolean
}

const ConnectionTypeIcon: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className={classNames('connection-type-icon', {
      'connection-type-openvpn': props.type === ServiceTypes.OPENVPN,
      'connection-type-wireguard': props.type === ServiceTypes.WIREGUARD,
      'active': props.active
    })}/>
  )
}

export default ConnectionTypeIcon

