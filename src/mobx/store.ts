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
import { AsyncBeneficiaryStore } from '../Pages/Authenticated/SettingsPage/Tabs/Account/asyncBeneficiary.store'
import { ClickBoardingStore } from './ClickBoarding.store'

export class MobXRootStore {
  historyPage: HistoryPageStore
  headerStore: HeaderStore
  asyncBeneficiaryStore: AsyncBeneficiaryStore
  clickBoardingStore: ClickBoardingStore

  constructor() {
    this.historyPage = new HistoryPageStore()
    this.historyPage.setupReactions()
    this.headerStore = new HeaderStore()
    this.headerStore.setupReactions()
    this.asyncBeneficiaryStore = new AsyncBeneficiaryStore()
    this.clickBoardingStore = new ClickBoardingStore()
  }
}

export const mobXRootStore = new MobXRootStore()
export const mobXStoresContext = React.createContext(mobXRootStore)

configure({ enforceActions: 'always' })

export const useStores = (): MobXRootStore => React.useContext(mobXStoresContext)
