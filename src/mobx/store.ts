/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { configure } from 'mobx'
import { HistoryPageStore } from '../Pages/Authenticated/HistoryPage/store'
import { HeaderStore } from '../Pages/Authenticated/Components/Layout/store'

export class MobXRootStore {
  historyPage: HistoryPageStore
  headerStore: HeaderStore

  constructor() {
    this.historyPage = new HistoryPageStore()
    this.headerStore = new HeaderStore()
    this.historyPage.setupReactions()
    this.headerStore.setupReactions()
  }
}

export const mobXRootStore = new MobXRootStore()
export const mobXStoresContext = React.createContext(mobXRootStore)

configure({ enforceActions: 'always' })

export const useStores = (): MobXRootStore => React.useContext(mobXStoresContext)
