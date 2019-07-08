import * as React from 'react'
import trans from '../../../../../trans'
import { ProviderState } from '../../../../reducer'
import FlagIcon from '../../../../../ui-kit/components/FlagIcon'
import { ServiceInfo } from 'mysterium-vpn-js'

const styles = require('./ConnectionInfo.module.scss')

type Props = {
  provider: ProviderState,
}

const ConnectionInfo = (props: Props) => {
  const { originalLocation: location, startedServices = [] } = props.provider
  ///TODO: startedServices list
  const service: ServiceInfo = startedServices[0]

  return service && (<div className={styles.infoBar}>
    <table>
      <thead>
      <tr>
        <th>{trans('app.node.running.public.ip')}</th>
        <th>{trans('app.node.running.server.id')}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <div className={styles.ipItem}>
            {location && location.country && (<FlagIcon code={String(location.country).toLowerCase()}/>)}
            <p>{location && location.ip}</p>
          </div>
        </td>
        <td>
          <a target={'_blank'}
             href={`${process.env.REACT_APP_MYSTERIUM_NETWORK}/node/${service.providerId}/${service.type}`}
             className={styles.infoID}>{service.providerId}</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>)
}

export default ConnectionInfo
