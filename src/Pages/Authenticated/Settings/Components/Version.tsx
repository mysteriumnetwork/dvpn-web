/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import packageJson from '../../../../../package.json'

interface Props {
  nodeVersion?: string
}

const Version = ({ nodeVersion }: Props) => {
  return (
    <div>
      <div>Node version {nodeVersion}</div>
      <div>WebUI version {packageJson.version}</div>
    </div>
  )
}

export default Version
