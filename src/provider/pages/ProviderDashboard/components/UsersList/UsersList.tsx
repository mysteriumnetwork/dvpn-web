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

  const sessionList = sessions && sessions.sort(function (a, b) {
    const aDate = new Date(a.createdAt)
    const bDate = new Date(b.createdAt)
    if (aDate > bDate) return -1
    if (aDate < bDate) return 1
    return 0
  })

  return (<div className={styles.usersList}>
    <Timer leader/>
    <div className={styles.scrollView}>
      <table>
        <thead>
        <tr>
          <th>{trans('app.node.running.sessions.session')}</th>
          <th>{trans('app.node.running.sessions.duration')}</th>
          <th>{trans('app.node.running.sessions.downloaded')}</th>
          <th>{trans('app.node.running.sessions.uploaded')}</th>
          <th>{trans('app.node.running.sessions.tokensEarned')}</th>
        </tr>
        </thead>
        <tbody>
        {sessionList && sessionList.map((value) => (
          <UserItem key={value.id} session={value}/>
        ))}
        </tbody>
      </table>
    </div>
  </div>)
}
export default UsersList
