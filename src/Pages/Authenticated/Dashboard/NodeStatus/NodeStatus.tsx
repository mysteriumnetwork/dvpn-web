/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Tooltip } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import React, { ReactFragment } from 'react'
import { NatStatusV2Response, ServiceInfo } from 'mysterium-vpn-js'
import { NATType } from '../../../../constants/nat'
import Bubble from './Bubble'
import { nodeStatusBubble, natType2Human, statusText, natTypeStatusBubble, BubbleStatus } from './nat-status.utils'
import './NodeStatus.scss'

interface Props {
  natType: string
  natTypeError?: string
  natTypeLoading: boolean

  natStatus: NatStatusV2Response
  nodeStatusFixUrl?: string
  natTypeFixUrl: string

  serviceInfos: ServiceInfo[]
}

const NodeStatus = ({ natStatus, natType, natTypeFixUrl, serviceInfos, natTypeLoading }: Props) => {
  const online = serviceInfos && serviceInfos.length > 0
  const nodeStatus = nodeStatusBubble(natStatus, online)
  const natTypeStatus = natTypeStatusBubble(natType, natTypeLoading)

  return (
    <div className="status-card">
      <div className="status-card__block">
        <div className="status-card__status-text">Node status:</div>
        <div className="status-card__status-icon">
          <Bubble status={nodeStatus} />
          <p className="status-card__status-icon-description">{statusText(natStatus, online)}</p>
        </div>
        {(online && natStatus.status === 'failed') ||
          (!online && (
            <div className="status-card__tooltip">
              <Tooltip title={nodeStatusTooltip(natStatus, online)} placement="bottom-start" arrow interactive>
                <HelpIcon fontSize="small" />
              </Tooltip>
            </div>
          ))}
      </div>

      <div className="status-card__block">
        <div className="status-card__status-text">Accepting Connections:</div>
        <div className="status-card__status-icon">
          <Bubble status={natTypeStatus} />
          <p className="status-card__status-icon-description">{natType2Human(natType, natTypeLoading)}</p>
        </div>
        <div className="status-card__tooltip">
          <Tooltip
            title={<div>{natTypeTooltip(natType, natTypeFixUrl)}</div>}
            style={{ backgroundColor: '#FFFFFF !important' }}
            placement="bottom-start"
            arrow
            interactive
          >
            <HelpIcon fontSize="small" />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

const nodeStatusTooltip = (nat: NatStatusV2Response, online: boolean): ReactFragment => {
  const content = (): ReactFragment => {
    if (!online) {
      return (
        <>
          <p>Your node does not appear to be on. Please make sure it's plugged in and connected to the internet.</p>
          <p>Try restarting the node and checking that it's connected to the router by a cable.</p>
        </>
      )
    }
    switch (nat.status) {
      case 'pending':
        return <p>Node check pending, please be patient.</p>
      case 'failed':
        return (
          <>
            <p>Our monitoring agent tried to connect to your node, but something went wrong.</p>
            <p>
              Please contact support via <a href="mailto:support@mysterium.network">email</a> or talk to us directly via
              live chat.
              <br />
              Alternatively, take a look at our{' '}
              <a target="_blank" rel="noopener noreferrer" href="https://docs.mysterium.network/">
                help section
              </a>{' '}
              for further assistance.
            </p>
          </>
        )
      default:
        return <></>
    }
  }

  return <div className="tooltip">{content()}</div>
}

const natTypeTooltip = (natType: string, natTypeFixUrl: string): ReactFragment => {
  const content = () => {
    switch (natType) {
      case 'none':
      case 'fullcone':
      case 'rcone':
        return <></>
      case 'prcone':
        return (
          <>
            <p>
              Most of network users can connect to your node. Only users with Symmetric NAT cannot. For more information
              see{' '}
              <a target="_blank" rel="noopener noreferrer" href={natTypeFixUrl}>
                documentation
              </a>
              .
            </p>
          </>
        )
      case 'symmetric':
        return (
          <>
            <p>
              Consumers are having hard time connecting to your node. Please check{' '}
              <a target="_blank" rel="noopener noreferrer" href={natTypeFixUrl}>
                documentation
              </a>{' '}
              on how to improve it.
            </p>
          </>
        )
      default:
        return <></>
    }
  }
  const tooltipContent = content()
  return (
    <div className="tooltip">
      <div className="tooltip__header">
        <span>Your NAT Type: </span>
        {NATType[natType] || 'Unknown'}.
      </div>
      {tooltipContent && <div className="tooltip__content">{tooltipContent}</div>}
    </div>
  )
}

export default NodeStatus
