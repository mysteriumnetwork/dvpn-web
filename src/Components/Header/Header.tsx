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

const Header = (props: Props): JSX.Element => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <props.logo />
      </div>
      <div className={styles.name}>{props.name}</div>
    </div>
  )
}

export default Header
