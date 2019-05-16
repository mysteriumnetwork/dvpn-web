import * as React from 'react'
import trans from '../../../../../trans'
import UserItem from './UserItem/UserItem'
import { ProviderReducer } from '../../../../reducer'

const styles = require('./UsersList.module.scss')

type Props = {
  provider: ProviderReducer,
}

const UsersList = (props: Props) => {

  const { sessions } = props.provider

  return (<div className={styles.usersList}>
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
          {sessions && sessions.map((value) => (<UserItem session={value}/>))}
          </tbody>
        </table>
      </div>
    </div>)
}
export default UsersList
