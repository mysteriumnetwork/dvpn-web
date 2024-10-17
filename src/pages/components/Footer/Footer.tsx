/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { faDiscord, faXTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FooterLinkIcon } from './FooterLinkIcon'
import { FooterLink } from './FooterLink'
import LogoWithTitle from '../../../components/Logo/LogoWithTitle'
import Container from '../../../components/Containers/Container'
import { BLOG, DOCS, TERMS, MMN_SITE_NODES_URL, SOCIAL_LINKS } from '../../../constants/urls'

export const Footer = () => {
  return (
    <Container className="bg-blue-750">
      <footer className="w-full py-6 2xl:py-28">
        <div className="flex flex-wrap gap-8 lg:md-6 w-full justify-between lg:items-center">
          <LogoWithTitle className="w-full lg:w-auto" variant="inverted" />
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-9">
            <FooterLink href={MMN_SITE_NODES_URL}>My Nodes</FooterLink>
            <FooterLink href={DOCS}>Help center</FooterLink>
            <FooterLink href={BLOG}>Blog</FooterLink>
            <FooterLink href={TERMS}>Terms & Conditions</FooterLink>
          </div>
          <div className="flex gap-2 2xl:gap-6 items-start lg:items-center lg:justify-between">
            <FooterLinkIcon href={SOCIAL_LINKS.DISCORD} icon={faDiscord} />
            <FooterLinkIcon href={SOCIAL_LINKS.X} icon={faXTwitter} />
            <FooterLinkIcon href={SOCIAL_LINKS.FACEBOOK} icon={faFacebook} />
            <FooterLinkIcon href={SOCIAL_LINKS.YOUTUBE} icon={faYoutube} />
          </div>
        </div>
        <div className="text-gray-125 text-sm font-normal mt-6 2xl:mt-12">
          © {new Date().getFullYear()} MystNodes. All rights reserved.
        </div>
      </footer>
    </Container>
  )
}

export default Footer
