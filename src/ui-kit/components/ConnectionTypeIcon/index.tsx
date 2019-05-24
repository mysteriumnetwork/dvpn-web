import React from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'
import { ServiceTypes } from '../../../api/data/service'

type Props = {
  type: string
  active?: boolean
}

const ConnectionTypeIcon: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className={classNames(styles.icon, {
      [styles.openvpn]: props.type === ServiceTypes.OPENVPN,
      [styles.wireguard]: props.type === ServiceTypes.WIREGUARD,
      [styles.active]: props.active
    })}/>
  )
}

export default ConnectionTypeIcon

