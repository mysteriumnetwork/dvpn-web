/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './TableComponents.module.scss'
import HelpTooltip from '../HelpTooltip/HelpTooltip'
import Button from '../Buttons/Button'
import _ from 'lodash'
import classNames from 'classnames'
import { Media } from '../../commons/media.utils'
import { Select, Option } from '../Select/Select'
import { useMemo } from 'react'
import { createResponsiveRange } from './table.utils'

interface HeaderProps {
  name: string
  tooltip?: JSX.Element
}

export const Header = ({ name, tooltip }: HeaderProps) => {
  return (
    <div className={styles.header}>
      {name}
      {tooltip && <HelpTooltip title={tooltip} />}
    </div>
  )
}

interface PaginationProps {
  page: number
  pageCount: number
  onChange: (page: number) => void
  onNext: () => void
  onPrevious: () => void
  canNext?: boolean
  canPrevious?: boolean
  responsive?: boolean
}

export const Pagination = ({
  page,
  pageCount,
  onChange,
  canNext,
  canPrevious,
  onNext,
  onPrevious,
  responsive,
}: PaginationProps) => {
  const pages = useMemo(() => {
    let range: number[]

    if (!responsive) {
      range = _.range(1, pageCount + 1)
    } else {
      range = createResponsiveRange(page, pageCount)
    }
    return range.map((n) => <Page key={n + page} number={n} onClick={onChange} active={n === page} />)
  }, [pageCount, page, responsive])

  const options = useMemo(
    () =>
      _.range(1, pageCount + 1).map((n) => {
        return { label: `${n}`, value: n }
      }),
    [pageCount],
  )
  const selectedOption = options.find((o) => o.value === page)
  const gotoSelect = (o: Option | Option[]) => {
    const { value } = o as Option
    onChange(value as number)
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.content}>
        <div className={styles.prev}>
          <Button extraStyle="outline" onClick={onPrevious} disabled={!canPrevious}>
            Prev
          </Button>
        </div>
        <Media.Mobile>
          <div className={styles.pages}>
            <Select value={selectedOption} options={options} onChange={gotoSelect} />
          </div>
        </Media.Mobile>
        <Media.Desktop>
          <div className={styles.pages}>{pages}</div>
        </Media.Desktop>
        <div className={styles.next}>
          <Button extraStyle="outline" onClick={onNext} disabled={!canNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

interface PageProps {
  number: number
  active?: boolean
  onClick: (page: number) => void
}

const Page = ({ number, active, onClick }: PageProps) => {
  return (
    <div onClick={() => onClick(number)} className={classNames(styles.page, active && styles.active)}>
      {number}
    </div>
  )
}
