/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { twMerge } from 'tailwind-merge'

type Props = {
  readonly value: string
  readonly className?: string
}

export const Title = ({ value, className }: Props) => {
  return (
    <div className={twMerge('text-blue-850 text-2xl md:text-3xl font-bold text-center mb-10 md:mb-14', className)}>
      {value}
    </div>
  )
}

export default Title
