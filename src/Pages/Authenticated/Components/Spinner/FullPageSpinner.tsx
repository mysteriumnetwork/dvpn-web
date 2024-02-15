/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Spinner } from '../../../../Components/Spinner/Spinner'

export const FullPageSpinner = () => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Spinner />
  </div>
)
