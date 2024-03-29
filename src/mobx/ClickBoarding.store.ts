/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { makeAutoObservable } from 'mobx'

export class ClickBoardingStore {
  _generatedPassword: string | undefined

  constructor() {
    makeAutoObservable(this)
  }

  set generatedPassword(password: string | undefined) {
    this._generatedPassword = password
  }

  get generatedPassword(): string | undefined {
    return this._generatedPassword
  }
}
