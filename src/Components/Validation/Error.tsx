/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
interface Props {
  show: boolean
  errorMessage: string
}

const Error = ({ show, errorMessage }: Props) => {
  return (
    <>
      {show && (
        <div>
          <div>{errorMessage}</div>
        </div>
      )}
    </>
  )
}
export default Error
