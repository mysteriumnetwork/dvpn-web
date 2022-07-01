/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity } from 'mysterium-vpn-js'
import React from 'react'
import CopyToClipboard from '../../../../Components/CopyToClipboard/CopyToClipboard'
import { InputGroup } from '../../../../Components/InputGroups/InputGroup'
import { TextField } from '../../../../Components/TextField/TextField'
import styles from './Components.module.scss'

interface Props {
  identity: Identity
}

const IdentityInformation = ({ identity }: Props): JSX.Element => {
  const { id } = identity

  return (
    <div className={styles.inputs}>
      <InputGroup label="Your identity" topRight={<CopyToClipboard text={id} />}>
        <TextField disabled={true} value={id} />
      </InputGroup>
    </div>
  )
}

export default IdentityInformation
