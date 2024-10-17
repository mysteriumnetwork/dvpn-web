/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

type Props = {
  readonly isExpanded: boolean
  readonly onClick: () => void
  readonly className?: string
}

const resolveIcon = (isExpanded: boolean) => (isExpanded ? faAngleDown : faAngleUp)

export const ExpandRowToggle = ({ isExpanded, onClick, className }: Props) => {
  return (
    <button
      className={twMerge(
        'border-none bg-none bg-transparent flex gap-1 justify-center items-center',
        'text-pink-525 leading-6 cursor-pointer select-none',
        className,
      )}
      onClick={onClick}
    >
      <FontAwesomeIcon className="size-2.5" icon={resolveIcon(isExpanded)} />
    </button>
  )
}
