import { StreamMessage } from "@components/stream_list/stream_message"
import { removeStream } from "@lib/router"
import { useRouter } from "next/router"
import { CopyButton } from "@components/copy_button"

const EmptyStream = () => (
  <div className="italic border border-dashed px-8 py-8 inline-block">
    Empty
  </div>
)

export const Stream = ({ stream, selectedMessage, selectMessage }) => {
  const { messages } = stream

  const router = useRouter()

  return (
    <div className="pl-2">
      <div className="bg-gray-50 bg-opacity-75 flex items-baseline mb-2 -ml-8 relative z-10">
        <button
          className="text-xs mr-2 text-gray-400 hover:bg-red-400 hover:text-white transition duration-150 ease-in-out rounded-full w-[25px] h-[25px]"
          onClick={() => removeStream(router, stream.name)}
        >
          ✕
        </button>
        <div className="truncate text-sm flex items-center gap-2 group">
          <span>{stream.name}</span>
          <CopyButton value={stream.name} variant="stream" />
        </div>
      </div>
      <div>
        {messages.length == 0 ? (
          <EmptyStream />
        ) : (
          <div className="grid grid-flow-col auto-cols-max gap-2 px-2 py-1 rounded bg-gradient-to-b from-gray-200 via-gray-300 to-gray-300 shadow-md w-max">
            {messages.map((message) => {
              const selected =
                message.global_position == selectedMessage?.global_position
              return (
                <StreamMessage
                  key={message.id}
                  message={message}
                  selected={selected}
                  selectMessage={selectMessage}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
