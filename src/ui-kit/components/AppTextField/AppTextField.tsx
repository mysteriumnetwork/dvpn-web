import * as React from 'react'
import injectSheet from 'react-jss'
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core'
import { TextFieldProps } from '@material-ui/core/TextField'

interface IStyles {
  formControl: string
  formLabel: string
  shrink: string
  root: string
  input: string
  focused: string
  helperText: string
  multiline: string
  inputMultiline: string
}

const styles = theme => ({
  formControl: {
    width: '100%',
  },
  root: {
    padding: 0,
    'label + &': {
      marginTop: '0 !important',
      height: 28,
    },
    borderRadius: 4,
    border: `${theme.colors.borderColor} 1px solid`,
  },
  multiline: {
    padding: '8px 0 9px !important',
    'label + &': {
      marginTop: '0 !important',
      height: 28,
    },
    borderRadius: 4,
    border: `${theme.colors.borderColor} 1px solid`,
  },
  inputMultiline: {
    padding: '0 12px 0 !important',
  },
  input: {
    padding: '8px 12px 9px',
    borderRadius: 4,
    width: '100%',
    fontFamily: '"mplus-1m", sans-serif !important',
    color: `${theme.colors.textMain}!important`,
    backgroundColor: theme.colors.whiteColor,
    fontSize: '14px !important',
    transition: theme.transitions.create(['border']),
  },
  formLabel: {
    fontSize: theme.typography.fontSizes.tableHeadFont,
    zIndex: 99,
    top: -4,
    marginLeft: 22,
    fontWeight: 400,
  },
  focused: {
    borderRadius: 4,
    boxShadow: 'none',
    borderColor: theme.colors.actionPurple
  },
  helperText: {
    marginTop: 3,
    fontSize: '0.75rem!important',
    marginLeft: 12
  },
})

export type IAppTextFieldProps = TextFieldProps & {
  errorSpace?: boolean
  errorText?: string
  shrink?: any
  onKeyUp?: any
  classes: IStyles
  style?: React.CSSProperties
}

const AppTextField = (props: IAppTextFieldProps) => (
  <FormControl className={`${props.classes.formControl} ${props.className || ''}`}>
    {props.label && (<InputLabel
      shrink={props.shrink}
      htmlFor={`id-${props.name}`}
    >
      {props.label}
    </InputLabel>)}
    <Input
      fullWidth={props.fullWidth}
      type={props.type}
      id={`id-${props.name}`}
      placeholder={props.placeholder}
      value={props.value}
      name={props.name}
      disabled={props.disabled}
      classes={{
        root: props.classes.root,
        input: props.classes.input,
        multiline: props.classes.multiline,
        inputMultiline: props.classes.inputMultiline,
        focused: props.classes.focused,
      }}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onKeyUp={props.onKeyUp}
      multiline={props.multiline}
      rows={props.rows}
      rowsMax={props.rowsMax}
      disableUnderline
    />
    {props.helperText && (
      <FormHelperText id={`${props.name}-text`} className={props.classes.helperText}>{props.helperText}</FormHelperText>
    )}
    {props.error ? (
      <FormHelperText error className={props.classes.helperText}
                      id={`${props.name}-err-text`}>{props.error}</FormHelperText>
    ) : (
      props.errorSpace && (<FormHelperText>&nbsp;</FormHelperText>)
    )}
  </FormControl>
)

export default injectSheet(styles)(AppTextField)
