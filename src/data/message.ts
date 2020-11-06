type Value = string | number | null
type MessageData = Record<string, Value>

export interface MessageMetadata {
  causationMessageStreamName?: string
  causationMessagePosition?: number
  causationMessageGlobalPosition?: number
  replyStreamName?: string
  correlationStreamName?: string
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
