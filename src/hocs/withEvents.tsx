import React from 'react'
import { EventEmitter } from 'events'

export type EventsProps = {
  events: EventEmitter
}

const events = new EventEmitter()

export default (BaseComponent: React.ComponentType) => (props: any) => (
  <BaseComponent events={events} {...props} />
)
