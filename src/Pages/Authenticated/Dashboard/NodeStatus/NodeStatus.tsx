/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NodeMonitoringStatus, NodeMonitoringStatusResponse } from 'mysterium-vpn-js'
import React, { ReactFragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useImmer } from 'use-immer'
import { tequila } from '../../../../api/wrapped-calls'
import { parseToastError } from '../../../../commons/toast.utils'
import Tooltip from '../../../../Components/Tooltip/Tooltip'
import { NATType } from '../../../../constants/nat'
import { DOCS, DOCS_NAT_FIX } from '../../../../constants/urls'
import { SSEState } from '../../../../redux/sse.slice'
import { RootState } from '../../../../redux/store'
import Bubble from './Bubble'
import { natType2Human, natTypeStatusBubble, nodeStatusBubble, statusText } from './nat-status.utils'
import './NodeStatus.scss'

const { api } = tequila

interface State {
  natStatus: NodeMonitoringStatusResponse
  nat: {
    loading: boolean
    type: string
    error?: string
  }
}

const initialState: State = {
  natStatus: {
    status: NodeMonitoringStatus.PASSED,
  },
  nat: {
    loading: true,
    type: '',
  },
}

const NodeStatus = () => {
  const sse = useSelector<RootState, SSEState>(({ sse }) => sse)
  const [state, setState] = useImmer<State>(initialState)

  useEffect(() => {
    const init = async () => {
      try {
        const [status, natType] = await Promise.all([api.nodeMonitoringStatus(), api.natType()])
        setState((d) => {
          d.natStatus = status
          d.nat.type = natType.type
          d.nat.error = natType.error
          d.nat.loading = false
        })
      } catch (e) {
        parseToastError(e)
      }
    }
    init()
  }, [])

  const serviceInfo = sse.appState?.serviceInfo
  const { natStatus, nat } = state
  const online = !!(serviceInfo && serviceInfo.length > 0)
  const nodeStatus = nodeStatusBubble(natStatus, online)
  const natTypeStatus = natTypeStatusBubble(nat.type, nat.loading)

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
              <Tooltip title={nodeStatusTooltip(natStatus, online)} placement="bottom-start" />
            </div>
          ))}
      </div>

      <div className="status-card__block">
        <div className="status-card__status-text">Accepting Connections:</div>
        <div className="status-card__status-icon">
          <Bubble status={natTypeStatus} />
          <p className="status-card__status-icon-description">{natType2Human(nat.type, nat.loading)}</p>
        </div>
        <div className="status-card__tooltip">
          <Tooltip title={<div>{natTypeTooltip(nat.type, DOCS_NAT_FIX)}</div>} />
        </div>
      </div>
    </div>
  )
}

const nodeStatusTooltip = (node: NodeMonitoringStatusResponse, online: boolean): ReactFragment => {
  const content = (): ReactFragment => {
    if (!online) {
      return (
        <>
          <p>Your node does not appear to be on. Please make sure it's plugged in and connected to the internet.</p>
          <p>Try restarting the node and checking that it's connected to the router by a cable.</p>
        </>
      )
    }
    switch (node.status) {
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
              <a target="_blank" rel="noopener noreferrer" href={DOCS}>
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
