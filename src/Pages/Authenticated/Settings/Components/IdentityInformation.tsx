/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TextField } from '../../../../Components/TextField/TextField'
import CopyToClipboard from '../../../../Components/CopyToClipboard/CopyToClipboard'

interface Props {
  identity: string
}

const IdentityInformation = ({ identity }: Props): JSX.Element => {
  return (
    <div className="input-group">
      <div className="flex-row">
        <div className="input-group__label m-t-5">Your identity</div>
        <CopyToClipboard text={identity} />
      </div>
      <TextField onChange={() => () => {}} disabled={true} value={identity} />
    </div>
  )
}

export default IdentityInformation
