import { StreamMessage } from "@components/stream_message"
import * as Data from "@data"
import "twin.macro"

export const Stream = ({ stream }: { stream: Data.Stream }) => {
  const { messages } = stream

  return (
    <div
      tw="grid grid-flow-col auto-cols-max gap-2 border p-2 bg-gray-100"
      css={{ width: "max-content" }}
    >
      {messages.map((message) => (
        <StreamMessage key={message.id} message={message} />
      ))}
    </div>
  )
}
