import * as React from 'react'
import trans from '../../../../../../../trans'
import { OriginalLocation } from '../../../../../../../api/data/original-location'
import FlagIcon from '../../../../../../../ui-kit/components/FlagIcon'
import injectSheet from 'react-jss'

interface IStyles {
  root: string
  info: string
  flagIcon: string
}

const styles = (theme: any) => ({
  root: {
    padding: 16,
    flex: '0 0.3 30%',
    minWidth: 240,
    display: 'flex',
    borderTop: '1px solid #E6E6E6',
  },
  info: {
    marginLeft: 16,
    '& > h3': {
      fontWeight: 'bold',
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.buttonText,
    },
    '& > p': {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.fontSizes.buttonText,
    },
  },
  flagIcon: {
    width: 32,
    height: 32,
  },
})

export interface IInfoBlockProps {
  onChange?: any
  classes: IStyles
  style?: React.CSSProperties
  location?: OriginalLocation
}

const InfoBlock: React.FunctionComponent<IInfoBlockProps> = (props: IInfoBlockProps) => props.location && (
  <div className={props.classes.root}>
    <FlagIcon className={props.classes.flagIcon} code={String(props.location.country).toLowerCase()}/>
    <div className={props.classes.info}>
      <h3>{trans('app.client.dashboard.not.connected')}</h3>
      <p>{String(props.location && props.location.ip)}</p>
    </div>
  </div>
)

export default injectSheet(styles)(InfoBlock)
