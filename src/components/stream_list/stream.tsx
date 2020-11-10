import { StreamMessage } from "@components/stream_list/stream_message"
import * as Data from "@data"
import { removeStream } from "@lib/router"
import { useRouter } from "next/router"
import "twin.macro"

const EmptyStream = () => (
  <div tw="italic border border-dashed px-8 py-8 inline-block">Empty</div>
)

export const Stream = ({ stream }: { stream: Data.Stream }) => {
  const { messages } = stream

  const router = useRouter()

  return (
    <div tw="pl-2">
      <div tw="z-10 absolute bg-white bg-opacity-75 flex -ml-8">
        <button
          tw="text-xs mr-2 text-gray-400 hover:(bg-red-400 text-white) transition duration-150 ease-in-out rounded-full "
          css={{ width: 25, height: 25 }}
          onClick={() => removeStream(router, stream.name)}
        >
          ✕
        </button>
        <div tw="truncate">{stream.name}</div>
      </div>
      <div tw="z-0 mt-8">
        {messages.length == 0 ? (
          <EmptyStream />
        ) : (
          <div
            tw="grid grid-flow-col auto-cols-max gap-2 border p-2 bg-gray-100"
            css={{ width: "max-content" }}
          >
            {messages.map((message) => (
              <StreamMessage key={message.id} message={message} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
