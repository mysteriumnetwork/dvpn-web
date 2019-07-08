import * as React from 'react'
// import { HTMLAttributes } from 'react'
// import Flag from 'react-country-flags'
// import classNames from 'classnames'
//
// type Props = HTMLAttributes<HTMLElement> & {
//   code: string
// }
//
// const FlagIcon = (props: Props) => (
//   <Flag className={classNames('flag-icon', props.className)} country={props.code}/>
// )
//
// export default FlagIcon


import FlagIconFactory from 'react-flag-icon-css'

const themeStyles = require('./flags.module.scss')

const FlagIcon = FlagIconFactory(React, { useCssModules: true, themeStyles})

export default FlagIcon
