/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TextField } from '../../../../Components/TextField/TextField'
import CopyToClipboard from '../../../../Components/CopyToClipboard/CopyToClipboard'
import { Identity } from 'mysterium-vpn-js'
import { InputGroup } from '../../../../Components/InputGroups/InputGroup'
import styles from './Components.module.scss'
import Tooltip from '../../../../Components/Tooltip/Tooltip'
import { QRCode } from 'react-qr-svg'
import React, { useMemo } from 'react'
import CropFreeIcon from '@material-ui/icons/CropFree'

interface Props {
  identity: Identity
}

const IdentityInformation = ({ identity }: Props): JSX.Element => {
  const { id, channelAddress } = identity

  const QR = useMemo(() => <QRCode value={identity.channelAddress} />, [identity.channelAddress])

  return (
    <div className={styles.inputs}>
      <InputGroup label="Your identity" topRight={<CopyToClipboard text={id} />}>
        <TextField disabled={true} value={id} />
      </InputGroup>
      <InputGroup
        label="Your Payment Channel"
        help="Channel address is an internal wallet of your node. This address can be used to top up MYST."
        topRight={
          <div className={styles.row}>
            <Tooltip icon={<CropFreeIcon />} title={<div className={styles.qr}>{QR}</div>} />
            <CopyToClipboard text={channelAddress} />
          </div>
        }
      >
        <TextField disabled={true} value={channelAddress} />
      </InputGroup>
    </div>
  )
}

export default IdentityInformation
