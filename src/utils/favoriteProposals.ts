import { Proposal } from 'mysterium-vpn-js'
import compareProposals from './compareProposals'
import { appStorage } from './storages'

class FavoriteProposals {

  private _favoriteProposals: Proposal[]

  constructor(private storage: StorageInterface) {}

  get favoriteProposals(): Proposal[] {
    if (!this._favoriteProposals) {
      try {
        this._favoriteProposals = this.storage.get<Proposal[]>('favoriteProposals') || []
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.debug('Parsing of favoriteProposals failed: ', err)
        }
        this._favoriteProposals = []
      }
    }

    return this._favoriteProposals
  }

  public addFavoriteProposals: Function = (newProposal: Proposal) => {
    const isProposalAdded = this.favoriteProposals.find(item => item.providerId === newProposal.providerId)

    if (!isProposalAdded) {
      this.favoriteProposals.push(newProposal)
      this.storage.set('favoriteProposals', this.favoriteProposals)
    }
    return this.favoriteProposals
  }

  public removeFavoriteProposals: Function = (proposal: Proposal) => {
    const index = this.favoriteProposals.findIndex(item => item.providerId === proposal.providerId)

    if (index > -1) {
      this.favoriteProposals.splice(index, 1)
      this.storage.set('favoriteProposals', this.favoriteProposals)
    }
    return this.favoriteProposals
  }

  public isFavorite(proposal: Proposal, favorites?: Proposal[]) {
    favorites = Array.isArray(favorites) ? favorites : this.favoriteProposals

    return proposal && favorites.some(p => compareProposals(p, proposal))
  }
}

export default new FavoriteProposals(appStorage)
