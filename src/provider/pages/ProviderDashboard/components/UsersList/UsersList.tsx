import * as React from 'react'
import trans from '../../../../../trans'
import UserItem from './UserItem/UserItem'
import { ProviderState } from '../../../../reducer'
import Timer from '../../../../../ui-kit/components/Timer'

const styles = require('./UsersList.module.scss')

type Props = {
  provider: ProviderState,
}

const UsersList = (props: Props) => {

  const { sessions } = props.provider

  return (<div className={styles.usersList}>
    <Timer leader/>
    <table>
      <thead>
      <tr>
        <th>{trans('app.node.running.user')}</th>
        <th>{trans('app.node.running.duration')}</th>
        <th>{trans('app.node.running.downloaded')}</th>
        <th>{trans('app.node.running.uploaded')}</th>
      </tr>
      </thead>
    </table>
    <div className={styles.scrollView}>
      <table>
        <tbody>
        {sessions && sessions.map((value) => (
          <UserItem key={value.id} session={value}/>
        ))}
        </tbody>
      </table>
    </div>
  </div>)
}
export default UsersList
