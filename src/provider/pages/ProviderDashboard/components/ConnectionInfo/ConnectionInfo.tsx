import * as React from 'react'
import _ from 'lodash'
import trans from '../../../../../trans'
import { ProviderState } from '../../../../reducer'
import FlagIcon from '../../../../../ui-kit/components/FlagIcon'
import classNames from 'classnames'

const styles = require('./ConnectionInfo.module.scss')

type Props = {
  provider: ProviderState,
}

const ConnectionInfo = (props: Props) => {
  const { originalLocation: location, startedServices = [] } = props.provider

  return Boolean(startedServices && startedServices.length) && (<div className={styles.infoBar}>
    <table>
      <thead>
      <tr>
        <th>{trans('app.node.running.public.ip')}</th>
        <th>{trans('app.node.running.server.id')}</th>
      </tr>
      </thead>
      <tbody>
      {
        startedServices.map(service => {
          const nodeType = _.get(service, 'proposal.serviceDefinition.locationOriginate.node_type') || ''

          return (<tr key={service.type}>
            <td>
              <div className={styles.ipItem}>
                {location && location.country && (<FlagIcon code={String(location.country).toLowerCase()}/>)}
                <p>
                  {location && location.ip}
                  <span className="node-type">
                      {trans(`node.type.${nodeType}`, undefined, '--')}
                    </span>
                </p>
              </div>
            </td>
            <td>
              <a target="_blank"
                 rel="noopener noreferrer"
                 href={`${process.env.REACT_APP_MYSTERIUM_NETWORK}/node/${service.providerId}/${service.type || ''}`}
                 className={classNames( styles.infoID, 'underlined')}>{service.providerId}</a>
            </td>
          </tr>)
        })
      }
      </tbody>
    </table>
  </div>)
}

export default ConnectionInfo
