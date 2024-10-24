/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Button, { ButtonVariant } from '../../../../components/Buttons/Button'
import { CenteredColumn } from '../Components'

const BUTTON_VARIANTS: ButtonVariant[] = ['primary', 'primary-outlined', 'secondary', 'secondary-outlined', 'outlined']

const ButtonsBook = () => {
  return (
    <CenteredColumn>
      {BUTTON_VARIANTS.map((v, i) => (
        <>
          <Button key={`${i}-${v}`} label="Test" variant={v} />
          <Button label="Test" variant={v} />
          <Button label="Test" variant={v} loading />
          <Button label="Test" variant={v} loading />
          <Button label="Test" variant={v} disabled />
          <Button label="Test" variant={v} disabled />
        </>
      ))}
    </CenteredColumn>
  )
}

export default ButtonsBook
