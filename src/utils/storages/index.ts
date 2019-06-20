import isElectron from '../isElectron'
import { ElectronFileStorage } from './ElectronFileStorage'
import BrowserLocalStorage from './BrowserLocalStorage'

export const appStorage: StorageInterface = isElectron() ? new ElectronFileStorage() : new BrowserLocalStorage()


