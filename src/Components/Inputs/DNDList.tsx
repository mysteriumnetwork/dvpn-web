/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import styled from 'styled-components'
import themes from '../../commons/themes'
import { DragIndicatorIcon } from '../Icons/Icons'

const DraggableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StyledDraggable = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${themes.current().colorLightBlue};
  border-radius: 5px;
  padding: 10px;
  font-weight: 400;
  font-size: ${themes.current().fontSizeSmall};
`

export type DNDListItem = {
  id: string
  label: string
}

interface Props {
  onChange?: (items: DNDListItem[]) => void
  items: DNDListItem[]
}

// a little function to help us with reordering the result
const reorder = (list: DNDListItem[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const DNDList = ({ items, onChange = () => {} }: Props) => {
  const [ditems, setDitems] = useState<DNDListItem[]>(items)

  const onDragEnd = (result: DropResult) => {
    // dropped outside
    if (!result.destination) {
      return
    }

    const reorderedItems = reorder(ditems, result.source.index, result.destination.index)
    setDitems(reorderedItems)
    onChange(reorderedItems)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <DraggableContainer {...provided.droppableProps} ref={provided.innerRef}>
            {ditems.map((item, idx) => (
              <Draggable key={item.id} draggableId={item.id} index={idx}>
                {(provided, snapshot) => (
                  <StyledDraggable ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {item.label}
                    <DragIndicatorIcon />
                  </StyledDraggable>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </DraggableContainer>
        )}
      </Droppable>
    </DragDropContext>
  )
}
