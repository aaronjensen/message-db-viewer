import { Message } from "@data/message"

export interface Stream {
  name: string
  messages: Message[]
}
