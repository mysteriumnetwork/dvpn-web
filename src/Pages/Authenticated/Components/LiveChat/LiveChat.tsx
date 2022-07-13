/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IconButton } from '../../../../Components/Inputs/IconButton'
import { ChatNavIcon } from '../../../../Components/Icons/NavigationIcons'

export const LiveChat = () => {
  const handleChat = () => {
    // @ts-ignore
    window.Intercom('show')
  }
  return <IconButton onClick={handleChat} icon={<ChatNavIcon />} />
}
