import { HttpInterface, Identity, IdentityPayout } from 'mysterium-vpn-js'

export interface TequilaApiInterface {
  current(passphrase: string): Promise<Identity>

  updateReferralCode(id: string, referralCode: string): Promise<void>
}

export class TequilaApi implements TequilaApiInterface {
  constructor(protected http: HttpInterface) {}

  public async current(passphrase: string): Promise<Identity> {
    const identity = await this.http.put('identities/current', { passphrase })

    if (!identity) {
      throw new Error('Identity response body is missing')
    }

    return identity
  }

  public async identityPayout(id: string): Promise<IdentityPayout> {
    const payout = await this.http.get(`identities/${id}/payout`)
    if (!payout) {
      throw new Error('Identity payout response body is missing')
    }
    return payout
  }


  public async updateReferralCode(id: string, referralCode: string): Promise<void> {
    await this.http.put(`identities/${id}/referral`, { referralCode: referralCode })
  }

}
