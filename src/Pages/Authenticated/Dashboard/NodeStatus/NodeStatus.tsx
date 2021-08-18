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
import { bubbleStatus, natType2Human, statusText } from './nat-status.utils'
import './NodeStatus.scss'

interface Props {
  natType: string
  natTypeError?: string
  natTypeLoading: boolean

  natStatus: NatStatusV2Response
  nodeStatusFixUrl?: string

  serviceInfos: ServiceInfo[]
}

const NodeStatus = ({ natStatus, natType, nodeStatusFixUrl, serviceInfos }: Props) => {
  const online = serviceInfos && serviceInfos.length > 0

  return (
    <div className="status-card">
      <div className="status-card__block">
        <div className="status-card__status-text">Node status:</div>
        <div className="status-card__status-icon">
          <Bubble status={bubbleStatus(natStatus, online)} />
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
        <div className="status-card__nat-text">NAT type:</div>
        <div className="status-card__nat-mode">{natType2Human(natType)}</div>
      </div>
      {/*<div className="status-card__block">
        <div className="status-card__nat-text">NAT traversal:</div>
        <div className="status-card__nat-mode">hole punching</div>
        <div className="status-card__tooltip">
          <Tooltip
            title={<div>{traversalToolTip()}</div>}
            style={{ backgroundColor: '#FFFFFF !important' }}
            placement="bottom-start"
            arrow
            interactive
          >
            <HelpIcon fontSize="small" />
          </Tooltip>
        </div>
      </div>*/}
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
        <>
          <p>Node check pending, please be patient.</p>
        </>
      )
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

/*const traversalToolTip = (): ReactFragment => (
  <div className="tooltip">
    <div className="tooltip__header">
      There are 4 traversal mechanisms possible. Node is trying to test each of them to become connectable for
      consumers.
    </div>
    <div className="tooltip__content p-l-15">
      <ol>
        <li>
          Check if node is running on public address. If there is public IP attached to network interface, then node is
          asking external services to ping him and ensure that it's ports are visible/opened externally.
        </li>
        <li>
          If step 1 failed node is trying to use UPnP (communicates with router and check if UPnP enabled). There still
          may be situation when there are couple of routers before public internet so sometimes you may need to disable
          this option in settings.
        </li>
        <li>
          If step 2 failed node is trying to use NAT hole punching. This technique requires support from both sides
          (consumer and provider). Also in some cases (depending on ISP router configs) internally punched ports are not
          match with one visible externally.
        </li>
        <li>If all previous cases failed, node assumes that user should configure manual port forwarding.</li>
      </ol>
    </div>
    <div className="tooltip__footer">
      NOTE: different sessions may be using different method. With one consumer UPnP will work, with another NAT hole
      punching will serve best.
    </div>
  </div>
)*/

export default NodeStatus
