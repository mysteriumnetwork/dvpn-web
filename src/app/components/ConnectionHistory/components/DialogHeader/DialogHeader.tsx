import * as React from 'react'
import injectSheet from 'react-jss'
import { IconButton, DialogTitle } from '@material-ui/core'
import trans from '../../../../../trans'

const classNames = require('classnames')

interface IStyles {
  titleRoot: string
  dialogHeader: string
  tabContainer: string
  tab: string
  active: string
}

const styles = (theme: any) => ({
  titleRoot: {
    padding: '0 !important',
  },
  dialogHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px',
    boxShadow: '0 0.5px 1px 0 rgba(0, 0, 0, 0.2)',
    '& > h3': {
      fontSize: theme.typography.fontSizes.buttonText,
      color: theme.colors.textMain,
      fontWeight: 'bold',
    },
    '& > button': {
      padding: 6,
    },
  },
  tabContainer: {
    borderRadius: 5,
    background: '#f8f8f8',
    display: 'flex',
    boxShadow: '0 0.3px 0.3px 0 rgba(0, 0, 0, 0.15)',
  },
  tab: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10rem',
    height: '1.7rem',
    borderRadius: 2,
    color: theme.colors.textMain,
    fontSize: theme.typography.fontSizes.buttonText,
    boxShadow: '0 0.3px 0.3px 0 rgba(0, 0, 0, 0.15)',
    border: 'solid 0.3px rgba(0, 0, 0, 0.1)',
    backgroundImage: 'linear-gradient(to bottom, #fefefe, #f2f2f2)',
    '&:first-child': {
      borderRadius: '4px 0 0 4px',
      borderRight: 'none',
    },
    '&:last-child': {
      borderRadius: '0 4px 4px 0',
      borderLeft: 'none',
    },
  },
  active: {
    color: theme.colors.whiteColor,
    boxShadow: 'inset 0 0.5px 1px 0 #632462',
    border: 'solid 0.3px rgba(0, 0, 0, 0.1)',
    backgroundImage: theme.colors.purpleMain,
  },
})

export interface IDialogHeaderProps {
  onChange?: any
  classes: IStyles
  style?: React.CSSProperties
}

const DialogHeader: React.SFC<IDialogHeaderProps> = (props: IDialogHeaderProps) => (
  <DialogTitle
    classes={{
      root: props.classes.titleRoot,
    }}
  >
    <div className={props.classes.dialogHeader}>
      <h3> {trans('document.title')}</h3>
      <div className={props.classes.tabContainer}>
        <div
          className={classNames(props.classes.tab, {
            // add class active when tab is open
            //   [props.classes.active]&&selected
          })}
        >
          {trans('app.connection.history.as.client')}
        </div>
        <div
          className={classNames(props.classes.tab, {
            // add class active when tab is open
            //   [props.classes.active]&&selected
          })}
        >
          {trans('app.connection.history.as.provider')}
        </div>
      </div>
      <IconButton>
        <div className="app-icons close-icon" />
      </IconButton>
    </div>
  </DialogTitle>
)

export default injectSheet(styles)(DialogHeader)
