/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button, ButtonVariant } from '../../../../Components/Inputs/Button'
import { LayoutRow } from '../../Components/Layout/Layout'

const BUTTON_VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'outlined', 'blue']

const ButtonsBook = () => {
  return (
    <>
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
    </>
  )
}

export default ButtonsBook
