/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import DragHandleIcon from '@material-ui/icons/DragHandle'
import { arrayMoveImmutable } from 'array-move'
import React from 'react'
import { OnDropCallback } from 'smooth-dnd/dist/src/exportTypes'
import './NATTraversalOrder.scss'
import { Container, Draggable } from 'react-smooth-dnd'

export interface TraversalProp {
  key: string
  label: string
}

interface Props {
  items: TraversalProp[]
  onDrop?: (items: TraversalProp[]) => void
}

const EmptyOptions = ({ text }: { text: string }) => <div className="nat-traversal-order__empty">{text}</div>

const Row = ({ prop }: { prop: TraversalProp }) => {
  return (
    <div className="nat-traversal-order__row drag-handle">
      <div className="nat-traversal-order__row-label">{prop.label}</div>
      <div className="nat-traversal-order__row-drag">
        <DragHandleIcon />
      </div>
    </div>
  )
}

export const NATTraversalOrder = ({ items, onDrop: onMove }: Props) => {
  const options = items.map((o) => (
    // @ts-ignore
    <Draggable key={o.key}>
      <Row prop={o} />
    </Draggable>
  ))

  const onDrop: OnDropCallback = ({ removedIndex, addedIndex }) => {
    const moved = arrayMoveImmutable(items, removedIndex!, addedIndex!)
    if (onMove) {
      onMove(moved)
    }
  }

  // TODO: Find alternative to react-smooth-dnd as it doesn't play nice with up to date typescript
  const draggableContainer = (
    // @ts-ignore
    <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
      {options}
    </Container>
  )
  return (
    <div className="nat-traversal-order">
      {options.length === 0 ? (
        <EmptyOptions text="None Selected" />
      ) : (
        <div className="nat-traversal-order__list">{draggableContainer}</div>
      )}
    </div>
  )
}
