import * as React from 'react'
import injectSheet from 'react-jss'
import { DialogContent } from '@material-ui/core'
import Button from '../../../../../ui-kit/components/Button/Button'
import trans from '../../../../../trans'

interface IStyles {
  rootStyled: string
  textStyled: string
  action: string
}

const styles = (theme: any) => ({
  rootStyled: {
    textAlign: 'center',
  },
  textStyled: {
    fontSize: theme.typography.fontSizes.tableHeadFont,
    color: theme.colors.textSecondary,
    margin: '0.5rem 0',
  },
  action: {
    margin: '1rem auto 0',
    '& > button': {
      padding: '4px 10px !important',
      minHeight: '24px !important',
      color: theme.colors.textMain,
      borderRadius: 4,
      fontSize: '0.75rem !important',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
      border: 'solid 0.3px rgba(0, 0, 0, 0.1)',
      backgroundImage: theme.colors.greyMain,
    },
  },
})

export interface IDialogContentProps {
  onChange?: any
  classes: IStyles
  style?: React.CSSProperties
}

const AppDialogContent: React.SFC<IDialogContentProps> = (props: IDialogContentProps) => (
  <DialogContent classes={{ root: props.classes.rootStyled }}>
    <p className={props.classes.textStyled}>{trans('app.about.app.version')} 1.2</p>
    <p className={props.classes.textStyled}>{trans('app.about.checked.for.updates')}</p>
    <div className={props.classes.action}>
      <Button onClick={() => {}}>{trans('app.about.check.for.updates')}</Button>
    </div>
  </DialogContent>
)

export default injectSheet(styles)(AppDialogContent)
