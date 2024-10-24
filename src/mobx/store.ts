/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { configure } from 'mobx'
import { SessionsStore } from './Sessions.store'
import { IndicationsStore } from './Indications.store'
import { BeneficiaryStore } from './BeneficiaryStore'
import { ClickBoardingStore } from './ClickBoarding.store'
import { MenuStore } from './Menu.store'

export class MobXRootStore {
  sessionsStore: SessionsStore
  indicationsStore: IndicationsStore
  beneficiaryStore: BeneficiaryStore
  clickBoardingStore: ClickBoardingStore
  menuStore: MenuStore

  constructor() {
    this.sessionsStore = new SessionsStore()
    this.indicationsStore = new IndicationsStore()
    this.indicationsStore.setupReactions()
    this.beneficiaryStore = new BeneficiaryStore()
    this.clickBoardingStore = new ClickBoardingStore()
    this.menuStore = new MenuStore()
  }
}

export const mobXRootStore = new MobXRootStore()
export const mobXStoresContext = React.createContext(mobXRootStore)

configure({ enforceActions: 'always' })

export const useStores = (): MobXRootStore => React.useContext(mobXStoresContext)
