/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Option } from '../../../../../../types/common'

const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank')
  win?.focus()
}

const toOptions = (o: { [key: string]: string }): Option[] =>
  Object.keys(o).map((key) => ({ value: key.toUpperCase(), label: o[key] }))

const gatewayUtils = {
  openInNewTab,
  toOptions,
}

export default gatewayUtils
