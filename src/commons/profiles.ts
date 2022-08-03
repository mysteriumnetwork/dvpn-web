/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactComponent as BobCatSvg } from '../assets/images/avatars/bobcat.svg'
import { ReactComponent as CatSvg } from '../assets/images/avatars/cat.svg'
import { ReactComponent as DogSvg } from '../assets/images/avatars/dog.svg'
import { ReactComponent as FoxSvg } from '../assets/images/avatars/fox.svg'
import { ReactComponent as GorillaSvg } from '../assets/images/avatars/gorilla.svg'
import { ReactComponent as KoalaSvg } from '../assets/images/avatars/koala.svg'
import { ReactComponent as LionSvg } from '../assets/images/avatars/lion.svg'
import { ReactComponent as RabbitSvg } from '../assets/images/avatars/rabbit.svg'

export const KEY_PROFILE_ICON = 'PROFILE_ICON'

export type AvatarNames = 'bobcat' | 'cat' | 'dog' | 'fox' | 'gorilla' | 'koala' | 'lion' | 'rabbit'

export const AVATAR_ICONS_DEFINITIONS: { key: AvatarNames; icon: any }[] = [
  {
    key: 'bobcat',
    icon: BobCatSvg,
  },
  {
    key: 'cat',
    icon: CatSvg,
  },
  {
    key: 'dog',
    icon: DogSvg,
  },
  {
    key: 'fox',
    icon: FoxSvg,
  },
  {
    key: 'gorilla',
    icon: GorillaSvg,
  },
  {
    key: 'koala',
    icon: KoalaSvg,
  },
  {
    key: 'lion',
    icon: LionSvg,
  },
  {
    key: 'rabbit',
    icon: RabbitSvg,
  },
]
