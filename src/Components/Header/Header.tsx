/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './Header.module.scss'

interface Props {
  logo: React.ComponentProps<any>
  name?: string
}

const Header = ({ logo, name }: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>{logo}</div>
      <div className={styles.name}>{name}</div>
    </div>
  )
}

export default Header
