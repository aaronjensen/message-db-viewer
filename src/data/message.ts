type Value = string | number | null
type MessageData = Record<string, Value>

export interface Message {
  id: string
  type: string
  data: MessageData
  position: number
  global_position: number
  stream_name: string
  metadata?: Record<string, string | number | null>
}
