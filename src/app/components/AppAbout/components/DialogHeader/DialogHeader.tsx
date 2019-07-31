import * as React from 'react'
import injectSheet from 'react-jss'
import { IconButton, DialogTitle } from '@material-ui/core'

import appPattern from "../../../assets/images/app-pattern.svg"
import appIcon from "../../../assets/images/AppIcon.svg"
import mysteriumNetworkLogo from "../../../assets/images/mysterium-network-logo.png"
import mysteriumNetworkLogo2x from "../../../assets/images/mysterium-network-logo@2x.png"

interface IStyles {
  titleRoot: string
  dialogHeader: string
  dialogHeaderBack: string
  tab?: string
  mysteriumLogo: string
}

const styles = (theme: any) => ({
  titleRoot: {
    padding: '0 !important',
    minWidth: 360,
  },
  dialogHeaderBack: {
    height: 240,
    width: '100%',
    position: 'absolute',
    background: `url(${appPattern})`,
    backgroundSize: 'cover',
    '&:after': {
      display: 'block',
      content: '" "',
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff)',
    },
  },
  dialogHeader: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > button': {
      position: 'absolute',
      right: 3,
      top: 3,
      padding: 6,
    },
    '& > div': {
      height: 184,
      width: 184,
      top: -24,
      position: 'relative',
      background: `url(${appIcon}) no-repeat`,
    },
  },
  mysteriumLogo: {
    width: 184,
    height: 56,
    margin: '-20px 0  12px',
    background: `url(${mysteriumNetworkLogo}) no-repeat center`,
    backgroundSize: 'contain',
    '@media only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)': {
      background: `url(${mysteriumNetworkLogo2x}) no-repeat center`,
      backgroundSize: 'contain',
    },
  },
})

export interface IDialogHeaderProps {
  onCloseClick?: any
  classes: IStyles
  style?: React.CSSProperties
}

const DialogHeader: React.FunctionComponent<IDialogHeaderProps> = (props: IDialogHeaderProps) => (
  <DialogTitle
    classes={{
      root: props.classes.titleRoot,
    }}
  >
    <div className={props.classes.dialogHeaderBack} />
    <div className={props.classes.dialogHeader}>
      <div />
      <p className={props.classes.mysteriumLogo} />
      <IconButton onClick={props.onCloseClick}>
        <div className="app-icons close-icon" />
      </IconButton>
    </div>
  </DialogTitle>
)

export default injectSheet(styles)(DialogHeader)
