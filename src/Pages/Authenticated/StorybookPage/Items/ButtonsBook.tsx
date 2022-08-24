/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button, ButtonVariant } from '../../../../Components/Inputs/Button'
import { LayoutRow } from '../../Components/Layout/Layout'
import { CenteredRow } from '../Components'
import { ReactComponent as ICO1 } from '../../../../assets/images/input/external.svg'
import { ReactComponent as ICO2 } from '../../../../assets/images/input/x.svg'
import { ReactComponent as ICO3 } from '../../../../assets/images/input/burger.svg'
import { ReactComponent as ICO4 } from '../../../../assets/images/input/email.svg'
import { ReactComponent as ICO5 } from '../../../../assets/images/input/copy-to-clipboard.svg'
import { ReactComponent as ICO6 } from '../../../../assets/images/input/lock.svg'
import { IconButton } from '../../../../Components/Inputs/IconButton'

const ICONS: any[] = [<ICO1 />, <ICO2 />, <ICO3 />, <ICO4 />, <ICO5 />, <ICO6 />]
const BUTTON_VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'outlined', 'blue']

const ButtonsBook = () => {
  return (
    <CenteredRow>
      {BUTTON_VARIANTS.map((v) => (
        <LayoutRow key={v}>
          <Button label="Test" variant={v} />
          <Button label="Test" variant={v} rounded />
          <Button label="Test" variant={v} loading />
          <Button label="Test" variant={v} rounded loading />
          <Button label="Test" variant={v} disabled />
          <Button label="Test" variant={v} disabled rounded />
        </LayoutRow>
      ))}
      <LayoutRow>
        {ICONS.map((ico, index) => (
          <IconButton key={`ico-btn-${index}`} icon={ico} />
        ))}
      </LayoutRow>
    </CenteredRow>
  )
}

export default ButtonsBook
