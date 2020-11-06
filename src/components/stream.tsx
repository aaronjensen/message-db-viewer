import { StreamMessage } from "@components/stream_message"
import * as Data from "@data"
import { parseStreamNames } from "@lib/router"
import { useRouter } from "next/router"
import "twin.macro"

export const Stream = ({ stream }: { stream: Data.Stream }) => {
  const { messages } = stream

  const router = useRouter()

  const hideStream = () => {
    let streamNames = parseStreamNames(router.query.streamNames)
    streamNames = streamNames.filter((name) => stream.name !== name)

    router.push({
      pathname: "/",
      query: { streamNames: streamNames.join(",") },
    })
  }

  return (
    <div>
      <div tw="z-10 absolute bg-white bg-opacity-75 flex">
        <div tw="mr-4">{stream.name}</div>
        <button tw="text-xs" onClick={hideStream}>
          hide
        </button>
      </div>
      <div tw="z-0 mt-8">
        <div
          tw="grid grid-flow-col auto-cols-max gap-2 border p-2 bg-gray-100"
          css={{ width: "max-content" }}
        >
          {messages.map((message) => (
            <StreamMessage key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  )
}