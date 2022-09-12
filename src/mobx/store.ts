/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { HistoryPageStore } from '../Pages/Authenticated/HistoryPage/store'
import React from 'react'
import { configure } from 'mobx'

export class MobXRootStore {
  historyPage: HistoryPageStore

  constructor() {
    this.historyPage = new HistoryPageStore()
    this.historyPage.setupReactions()
  }
}

export const mobXRootStore = new MobXRootStore()
export const mobXStoresContext = React.createContext(mobXRootStore)

configure({ enforceActions: 'always' })

export const useStores = (): MobXRootStore => React.useContext(mobXStoresContext)
