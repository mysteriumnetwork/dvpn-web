import * as React from 'react'
import { ServiceSession } from '../../../../../../api/data/service-session'

const styles = require('./UserItem.module.scss')

type Props = {
  session: ServiceSession
}

const UserItem = (props: Props) => {
  const { consumerId, id } = props.session
  return (
    <tr>
      <td>
        <div className={styles.ipItem}>
          <div className="flag-icon"/>
          <p>{consumerId}</p>
        </div>
      </td>
      <td>--{/*00:00:02:15*/}</td>
      <td>--{/*9.11 GB*/}</td>
      <td>--{/*39.12 MB*/}</td>
    </tr>
  )
}
export default UserItem
