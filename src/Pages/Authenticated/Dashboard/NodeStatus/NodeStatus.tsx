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
        <div className="status-card__status-text">NAT type:</div>
        <div className="status-card__status-icon">
          <Bubble status={natTypeStatus} />
          <p className="status-card__status-icon-description">{natType2Human(natType, natTypeLoading)}</p>
        </div>
        <div className="status-card__tooltip">
          {natTypeStatus === BubbleStatus.WARNING && (
            <Tooltip
              title={<div>{natTypeTooltip(natTypeFixUrl)}</div>}
              style={{ backgroundColor: '#FFFFFF !important' }}
              placement="bottom-start"
              arrow
              interactive
            >
              <HelpIcon fontSize="small" />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}

const nodeStatusTooltip = (nat: NatStatusV2Response, online: boolean): ReactFragment => {
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
      return (
        <div className="tooltip">
          <p>Node check pending, please be patient.</p>
        </div>
      )
    case 'failed':
      return (
        <div className="tooltip">
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
        </div>
      )
    default:
      return <></>
  }
}

const natTypeTooltip = (natTypeFixUrl: string): ReactFragment => (
  <div className="tooltip">
    Some consumers may experience connectivity issues with your node due to restrictive NAT Type. We suggest to adjust a{' '}
    <a target="_blank" rel="noopener noreferrer" href={natTypeFixUrl}>
      few things
    </a>{' '}
    within your router or gateway.
  </div>
)

export default NodeStatus
