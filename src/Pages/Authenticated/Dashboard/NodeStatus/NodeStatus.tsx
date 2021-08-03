/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './NodeStatus.scss'
import Bubble from './Bubble'
import HelpIcon from '@material-ui/icons/Help'
import { Tooltip } from '@material-ui/core'
import { BubbleStatus } from './nat-status.utils'

const NodeStatus = () => {
  return (
    <div className="status-card">
      <div className="status-card__status-text">Node status:</div>
      <div className="status-card__status-icon">
        <Bubble status={BubbleStatus.SUCCESS} />
        Success
      </div>
      <div className="flex-grow" />
      <div className="status-card__nat-text">NAT traversal method:</div>
      <div className="status-card__nat-mode">hole punching</div>
      <div className="status-card__nat-mode-help">
        <Tooltip title={tooltipHTML()} placement="bottom-start">
          <HelpIcon fontSize="small" />
        </Tooltip>
      </div>
    </div>
  )
}

const tooltipHTML = (): React.ReactFragment => (
  <div className="status-card__nat-mode-help__tooltip">
    <div className="status-card__nat-mode-help__tooltip-header">
      There are 4 traversal mechanisms possible. Node is trying to test each of them to become connectable for
      consumers.
    </div>
    <div className="status-card__nat-mode-help__tooltip-content">
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
    <div className="status-card__nat-mode-help__tooltip-footer">
      NOTE: different sessions may be using different method. With one consumer UPnP will work, with another NAT hole
      punching will serve best.
    </div>
  </div>
)

export default NodeStatus
