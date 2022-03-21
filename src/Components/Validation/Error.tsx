/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Collapse from '@material-ui/core/Collapse'
import { Alert } from '@material-ui/lab'

interface Props {
  show: boolean
  errorMessage: string
}

const Error = ({ show, errorMessage }: Props) => {
  return (
    <Collapse in={show}>
      <Alert severity="error">{errorMessage}</Alert>
    </Collapse>
  )
}

export default Error
