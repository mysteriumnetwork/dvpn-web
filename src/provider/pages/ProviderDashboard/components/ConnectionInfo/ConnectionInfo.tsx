import * as React from 'react'
import trans from '../../../../../trans'
import { ProviderReducer } from '../../../../reducer'
import FlagIcon from '../../../../../ui-kit/components/FlagIcon'

const styles = require('./ConnectionInfo.module.scss')

type Props = {
  provider: ProviderReducer,
}

const ConnectionInfo = (props: Props) => {
  const { originalLocation: location = {}, startedServices = [] } = props.provider
  ///TODO: startedServices list
  const service: any = startedServices[0] || {}

  return (<div className={styles.infoBar}>
    <table>
      <thead>
      <tr>
        <th>{trans('app.node.running.external.ip')}</th>
        <th>{trans('app.node.running.server.id')}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <div className={styles.ipItem}>
            {location.country && (<FlagIcon code={String(location.country).toLowerCase()}/>)}
            <p>{location.ip}</p>
          </div>
        </td>
        <td>
          <span className={styles.infoID}>{service.providerId}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>)
}

export default ConnectionInfo
