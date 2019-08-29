import * as React from 'react'
import formatBytes from 'utils/formatBytes'
import Timer from '../../../../../../ui-kit/components/Timer'
import formatDuration from 'format-duration'
import { ServiceSession } from 'mysterium-vpn-js'

const styles = require('./UserItem.module.scss')

type Props = {
  session: ServiceSession
}

const UserItem = (props: Props) => {
  const { consumerId, id, createdAt, bytesIn, bytesOut } = props.session as any

  return (
    <tr>
      <td title={consumerId}>
        <div className={styles.ipItem}>
          {/*<div className="flag-icon"/>*/}
          <a target={'_blank'} className='underlined'
             href={`${process.env.REACT_APP_MYSTERIUM_NETWORK}/session/${id}`}>{id}</a>
        </div>
      </td>
      <td>
        <Timer>
          {(value) => formatDuration((value && (value - Date.parse(createdAt))) || 0, { leading: true })}
        </Timer>
      </td>
      <td>{formatBytes(parseInt(bytesIn, 10))}</td>
      <td>{formatBytes(parseInt(bytesOut, 10))}</td>
    </tr>
  )
}
export default UserItem
