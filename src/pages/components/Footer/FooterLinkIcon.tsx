/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type Props = {
  readonly href: string
  readonly icon: IconDefinition
}

export const FooterLinkIcon = ({ icon, href }: Props) => (
  <a href={href} className="no-underline w-fit bg-gray-300 rounded-full p-1 flex items-center justify-center">
    <FontAwesomeIcon className="text-blue-750 w-5 h-5 max-w-5 max-h-5" icon={icon} />
  </a>
)
