/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { tequilapiClient } from '../../../../../api/TequilApiClient'
import { SUPPORTED_TRAVERSALS } from '../../../../../commons/config'
import { TraversalProp } from './NATTraversalOrder'

export interface Data {
  stunServers: string
  udpPorts: string
  rpcl2: string
  natTraversalSelected: TraversalProp[]
}

export const validateData = async (data: Data): Promise<string[]> => {
  const { stunServers, udpPorts, natTraversalSelected, rpcl2 } = data
  let errors: string[] = []

  if (stunServers.length !== 0) {
    stunServers.split(',').forEach((url) => {
      try {
        new URL(`http://${url}`)
      } catch (_) {
        errors.push(`Invalid stun server URL: ${url}`)
      }
    })
  } else {
    errors.push('Stun server required')
  }

  if (natTraversalSelected.length !== 0) {
    natTraversalSelected.forEach((t) => {
      if (SUPPORTED_TRAVERSALS.indexOf(t.key) === -1) {
        errors.push(`Unsupported NAT traversal: ${t}. Allowed: (${SUPPORTED_TRAVERSALS.join(',')}`)
      }
    })
  } else {
    errors.push('NAT Traversal required')
  }

  const ranges = udpPorts.split(':')
  if (ranges.length !== 2) {
    errors.push(`Invalid Port Range format '${udpPorts}'`)
  }
  const lower = parseInt(ranges[0])
  const upper = parseInt(ranges[1])

  if (lower > upper || lower < 1 || lower > 65535 || upper < 1 || upper > 65535 || lower === upper) {
    errors.push(`Invalid Port Range '${udpPorts}'`)
  }

  if (rpcl2.length > 0) {
    rpcl2.split(',').forEach((url) => {
      try {
        new URL(url)
      } catch (e) {
        errors.push(`Invalid L2 RPC URL: ${url}`)
      }
    })

    if (errors.length > 0) {
      return errors
    }

    try {
      await tequilapiClient.validateEthRPCL2(rpcl2.split(','))
    } catch (e) {
      errors.push(e.message)
    }
  }

  return errors
}
