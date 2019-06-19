import { Proposal } from '../api/data/proposal'
import { compareProposals } from './compareProposals'

interface FavoriteProposalsInterface {
  favoriteProposals: Proposal[],
  addFavoriteProposals: Function,
  removeFavoriteProposals: Function,
}

class FavoriteProposals implements FavoriteProposalsInterface {

  private _favoriteProposals: Proposal[]

  get favoriteProposals(): Proposal[] {
    if (!this._favoriteProposals) {
      try {
        const favoriteProposals = localStorage.getItem('favoriteProposals')
        this._favoriteProposals = favoriteProposals ? JSON.parse(favoriteProposals) : []
      } catch (err) {
        console.debug('Parsing of favoriteProposals failed: ', err)
        this._favoriteProposals = []
      }
    }

    return this._favoriteProposals
  }

  public addFavoriteProposals: Function = (newProposal: Proposal) => {
    const favoriteProposals = this.favoriteProposals
    const isProposalAdded = favoriteProposals.find(item => item.providerId === newProposal.providerId)

    if (!isProposalAdded) {
      favoriteProposals.push(newProposal)
      localStorage.setItem('favoriteProposals', JSON.stringify(favoriteProposals))
    }
    return favoriteProposals
  }

  public removeFavoriteProposals: Function = (proposal: Proposal) => {
    const favoriteProposals = this.favoriteProposals
    const index = favoriteProposals.findIndex(item => item.providerId === proposal.providerId)

    if (index > -1) {
      favoriteProposals.splice(index, 1)
      localStorage.setItem('favoriteProposals', JSON.stringify(favoriteProposals))
    }
    return favoriteProposals
  }

  public isFavorite(proposal: Proposal, favorites?: Proposal[]) {
    favorites = Array.isArray(favorites) ? favorites : this.favoriteProposals

    return proposal && favorites.some(p => compareProposals(p, proposal))
  }
}

export default new FavoriteProposals()
