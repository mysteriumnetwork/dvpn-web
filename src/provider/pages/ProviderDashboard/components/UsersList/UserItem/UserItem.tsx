import * as React from 'react'
import { ServiceSession } from '../../../../../../api/data/service-session'

const styles = require('./UserItem.module.scss')

type Props = {
  session: ServiceSession
}

const UserItem = (props: Props) => {
  const { consumerId } = props.session
  //const duration = (Date.now() - Date.parse(createdAt)) || 0

  return (
    <tr>
      <td title={consumerId}>
        <div className={styles.ipItem}>
          {/*<div className="flag-icon"/>*/}
          <a target={'_blank'}
             href={`${process.env.REACT_APP_MYSTERIUM_NETWORK}/session/${consumerId}`}>{consumerId}</a>
        </div>
      </td>
      {/*<td>{duration ? formatDuration(duration, { leading: true }) : '--'}</td>*/}
      <td>--</td>
      <td>--{/*9.11 GB*/}</td>
      <td>--{/*39.12 MB*/}</td>
    </tr>
  )
}
export default UserItem
