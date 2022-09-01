/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChatNavIcon } from '../../../../Components/Icons/NavigationIcons'
import { useIntercom } from '../../../../commons/intercom'
import { ExpandableControl } from '../../../../Components/Navigation/ExpandableControl'

interface Props {
  title: string
  expanded: boolean
}

export const Chat = ({ title, expanded }: Props) => {
  const { show, hide, open } = useIntercom({ hideLauncher: true })
  return (
    <ExpandableControl
      title={title}
      expanded={expanded}
      icon={<ChatNavIcon />}
      onClick={() => (open ? hide() : show())}
    />
  )
}
