/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Collapse from '@material-ui/core/Collapse'
import { Alert } from '@material-ui/lab'

interface Props {
  error: boolean
  errorMessage: string
}

const Errors = ({ error, errorMessage }: Props) => {
  return (
    <Collapse in={error}>
      <Alert severity="error">{errorMessage}</Alert>
    </Collapse>
  )
}

export default Errors
