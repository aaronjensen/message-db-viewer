export type Value = string | number | null
export type MessageData = Record<string, Value | undefined>

export interface MessageMetadata {
  causationMessageStreamName?: string
  causationMessagePosition?: number
  causationMessageGlobalPosition?: number
  replyStreamName?: string
  correlationStreamName?: string
  [key: string]: Value | undefined
}

export interface Message {
  id: string
  type: string
  data: MessageData
  position: string
  global_position: string
  stream_name: string
  metadata?: MessageMetadata
}
