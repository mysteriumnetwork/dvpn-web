/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { makeAutoObservable } from 'mobx'

export class MenuStore {
  _isOpen: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  public setIsOpen(value: boolean) {
    this._isOpen = value
  }

  get isOpen(): boolean {
    return this._isOpen
  }
}
