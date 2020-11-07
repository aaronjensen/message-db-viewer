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
  position: number
  global_position: number
  stream_name: string
  metadata?: MessageMetadata
}
