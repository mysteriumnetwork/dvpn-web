/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TextField } from '../../../../Components/TextField/TextField'
import CopyToClipboard from '../../../../Components/CopyToClipboard/CopyToClipboard'
import { Identity } from 'mysterium-vpn-js'

interface Props {
  identity?: Identity
}

const IdentityInformation = ({ identity }: Props): JSX.Element => {
  const { id, channelAddress } = identity || { id: 'N/A', channelAddress: 'N/A' }
  return (
    <>
      <div className="input-group">
        <div className="flex-row">
          <div className="input-group__label m-t-5">Your identity</div>
          <CopyToClipboard text={id} />
        </div>
        <TextField disabled={true} value={id} />
      </div>
      <div className="input-group">
        <div className="flex-row">
          <div className="input-group__label m-t-5">Your Payment Channel</div>
          <CopyToClipboard text={channelAddress} />
        </div>
        <TextField disabled={true} value={channelAddress} />
      </div>
    </>
  )
}

export default IdentityInformation
