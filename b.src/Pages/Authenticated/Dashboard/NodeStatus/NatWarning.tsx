/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './NatWarning.scss'

interface Props {
  troubleshootUrl?: string
}

export const NatWarning = ({ troubleshootUrl }: Props) => {
  return (
    <div className="nat-warning">
      <div className="nat-warning__warning">Attention!</div>
      <div className="nat-warning__header">Port Restricted Cone NAT detected!</div>
      <div className="nat-warning__content">
        This will limit your node discoverability for consumers. If you wish to improve your node discoverability please
        visit our{' '}
        <a target="_blank" rel="noopener noreferrer" href={troubleshootUrl}>
          documentation
        </a>{' '}
        for details.
      </div>
    </div>
  )
}
