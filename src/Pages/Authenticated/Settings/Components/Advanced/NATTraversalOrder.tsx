/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import Chip from '@material-ui/core/Chip'
import './NATTraversalOrder.scss'

export interface ChipProp {
  key: string
  label: string
}

interface Props {
  available: ChipProp[]
  onAvailableClick: (clicked: ChipProp, selected: ChipProp[]) => void
  selected: ChipProp[]
  onSelectedDelete: (clicked: ChipProp, selected: ChipProp[]) => void
}

const EmptyOptions = ({ text }: { text: string }) => (
  <div className="nat-traversal-order__row-options-empty">{text}</div>
)

export const NATTraversalOrder = ({ available, onAvailableClick, selected, onSelectedDelete }: Props) => {
  const availableMapped = available
    .filter((a) => !selected.find((s) => s.key === a.key))
    .map((a) => {
      return (
        <div key={a.key} className="nat-traversal-order__chip">
          <Chip id={a.key} label={a.label} onClick={() => onAvailableClick(a, [...selected, a])} />
        </div>
      )
    })

  const selectedMapped = selected.map((s) => {
    return (
      <div key={s.key} className="nat-traversal-order__chip">
        <Chip
          id={s.key}
          label={s.label}
          onDelete={() =>
            onSelectedDelete(
              s,
              selected.filter((i) => i.key !== s.key),
            )
          }
        />
      </div>
    )
  })

  return (
    <div className="nat-traversal-order">
      <div className="nat-traversal-order__row">
        <div className="nat-traversal-order__row-label">Selected:</div>
        <div className="nat-traversal-order__row-options">
          {selectedMapped?.length ? selectedMapped : <EmptyOptions text="None Selected" />}
        </div>
      </div>
      <div className="nat-traversal-order__row">
        <div className="nat-traversal-order__row-label">Available:</div>
        <div className="nat-traversal-order__row-options">
          {availableMapped?.length ? availableMapped : <EmptyOptions text="None Available" />}
        </div>
      </div>
    </div>
  )
}
