import * as React from 'react'
import injectSheet from 'react-jss'
import { Radio, FormControlLabel } from '@material-ui/core'

const checkedIcon = require('../../../app/components/assets/images/control-icons.svg')

interface IStyles {
  formControlLabel: string
  labelStyled: string
  rootStyled: string
  checked: string
  colorPrimary: string
  disabled: string
  customIcon: string
  customIconChecked: string
}

const styles = theme => ({
  formControlLabel: {
    margin: '0!important',
  },
  labelStyled: {
    paddingLeft: 10,
    fontSize: theme.typography.fontSizes.buttonText,
    color: theme.colors.textMain,
  },
  rootStyled: {
    padding: '0 !important',
    '&$checked': {
      color: theme.colors.actionPurple,
    },
  },
  checked: {
    color: theme.colors.actionPurple,
  },
  disabled: {
    color: theme.colors.borderColor,
  },
  colorPrimary: {
    '&$checked': {
      color: theme.colors.actionPurple,
    },
  },
  customIcon: {
    height: 16,
    width: 16,
    background: `url("${checkedIcon}") no-repeat`,
    backgroundSize: '85px 32px',
    backgroundPosition: '-46px 0',
  },
  customIconChecked: {
    height: 16,
    width: 16,
    background: `url("${checkedIcon}") no-repeat`,
    backgroundSize: '85px 32px',
    backgroundPosition: '0 0',
  },
})

export interface IRadioButtonProps {
  label?: string
  value?: string | number | boolean
  checked?: any
  onChange?: any
  classes: IStyles
  style?: React.CSSProperties
}

const RadioButton: React.SFC<IRadioButtonProps> = (props: IRadioButtonProps) => (
  <FormControlLabel
    classes={{
      root: props.classes.formControlLabel,
      label: props.classes.labelStyled,
    }}
    control={
      <Radio
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
        classes={{
          root: props.classes.rootStyled,
          checked: props.classes.checked,
          colorPrimary: props.classes.colorPrimary,
          disabled: props.classes.disabled,
        }}
        icon={<span className={props.classes.customIcon} />}
        checkedIcon={<span className={props.classes.customIconChecked} />}
      />
    }
    label={props.label}
  />
)

export default injectSheet(styles)(RadioButton)
