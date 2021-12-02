/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import packageJson from '../../../../../package.json'

interface Props {
  nodeVersion?: string
  nodeCommit?: string
}

const Version = ({ nodeVersion, nodeCommit }: Props) => {
  return (
    <div>
      <div>
        Node version: mainnet ({nodeVersion}
        {nodeCommit ? '-' + nodeCommit : ''})
      </div>
      <div>NodeUI version: {packageJson.version}</div>
    </div>
  )
}

export default Version
