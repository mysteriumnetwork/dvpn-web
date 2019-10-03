import * as React from 'react'
import injectSheet from 'react-jss'
import { Button } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'

interface IStyles {
  rootStyled: string
  labelStyled: string
  colorPrimary: string
  disabled: string
  flatPrimaryStyled: string
  textPrimaryStyled: string
  textSecondaryStyled: string
  flatSecondaryStyled: string
}

const styles = (theme: any) => ({
  disabled: {
    opacity: 0.6,
    // color: '#fff !important',
    // background: '#cccccc !important',
    boxShadow: 'none !important',
  },
  rootStyled: {
    minHeight: '40px !important',
    minWidth: '114px !important',
    paddingRight: '20px !important',
    paddingLeft: '20px !important',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: `${theme.typography.fontSizes.buttonText} !important`,
    '& > span > span': {
      fontSize: 24,
      marginRight: 10,
    },
  },
  labelStyled: {
    textTransform: 'none',
  },
  textPrimaryStyled: {
    fontWeight: 'bold !important',
    color: `${theme.colors.whiteColor} !important`,
  },
  textSecondaryStyled: {
    color: theme.colors.textMain,
  },
  flatPrimaryStyled: {
    backgroundImage: theme.colors.purpleMain,
    boxShadow: 'inset 0 0.3px 0.5px 0 #c25995',
  },
  flatSecondaryStyled: {
    outline: '0.001em solid rgba(0, 0, 0, 0.1)',
    backgroundImage: theme.colors.greyMain,
  },
})

export interface IButtonProps extends ButtonProps {
  classes?: IStyles
  component?: any;
  to?: any
}

const AppButton: React.FunctionComponent<IButtonProps> = (props: IButtonProps) => {
  const { classes, children, ...btnProps } = props
  return (
    <Button
      {...btnProps}
      classes={{
        root: classes.rootStyled,
        label: classes.labelStyled,
        disabled: classes.disabled,
        flatPrimary: classes.flatPrimaryStyled,
        textPrimary: classes.textPrimaryStyled,
        textSecondary: classes.textSecondaryStyled,
        flatSecondary: classes.flatSecondaryStyled,
      }}
    >
      {children}
    </Button>
  )
}

export default injectSheet(styles)(AppButton)
