import { Proposal } from '../api/data/proposal'

interface FavoriteProposalsInterface {
  favoriteProposals: Proposal[],
  addFavoriteProposals: Function,
  removeFavoriteProposals: Function,
}

class FavoriteProposals implements FavoriteProposalsInterface {


  get favoriteProposals(): Proposal[] {
    try {
      const favoriteProposals = localStorage.getItem('favoriteProposals')
      return favoriteProposals ? JSON.parse(favoriteProposals) : []
    } catch (err) {
      console.warn('Parsing of favoriteProposals failed: ', err)
    }
    return []
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
}

export default new FavoriteProposals()
