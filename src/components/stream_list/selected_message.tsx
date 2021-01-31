import tw from "twin.macro"
import { css } from "twin.macro"
import * as Data from "@data"

export const SelectedMessage = ({
  message,
  close,
}: {
  message: Data.Message
  close: () => void
}) => {
  return (
    <section
      tw="sticky top-0 bottom-0 right-0 z-10 flex-none overflow-hidden inset-y-0 pl-10 max-w-full flex"
      aria-labelledby="slide-over-heading"
    >
      <div tw="w-screen max-w-md">
        <div tw="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
          <div tw="py-6 px-4 bg-blue-700 sm:px-6">
            <div tw="flex items-center justify-between">
              <h2 id="slide-over-heading" tw="text-lg font-medium text-white">
                {message.type}
              </h2>
              <div tw="ml-3 h-7 flex items-center">
                <button
                  tw="bg-blue-700 rounded-md text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={close}
                >
                  <span tw="sr-only">Close panel</span>
                  <svg
                    tw="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div tw="mt-3 text-xs font-mono">
              <dl tw="grid grid-cols-2 gap-3">
                <div tw="col-span-2">
                  <dt tw="pr-4 text-blue-300">streamName</dt>
                  <dd tw="mt-1 text-blue-200 truncate text-sm">
                    <DataValue value={message.stream_name} />
                  </dd>
                </div>
                <div>
                  <dt tw="pr-4 text-blue-300">position</dt>
                  <dd tw="mt-1 text-blue-200 text-sm">
                    <DataValue value={message.position} />
                  </dd>
                </div>
                <div>
                  <dt tw="pr-4 text-blue-300">globalPosition</dt>
                  <dd tw="mt-1 text-blue-200 text-sm">
                    <DataValue value={message.global_position} />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div tw="mt-6 relative flex-1 px-4 sm:px-6 py-6 text-xs">
            <div tw="absolute inset-0 px-4 sm:px-6">
              <DataTable title="Data" data={message.data} />

              {message.metadata && (
                <DataTable title="Metadata" data={message.metadata} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const DataTable = ({
  title,
  data,
}: {
  title: string
  data: Data.MessageData
}) => (
  <div>
    <h2 tw="text-sm font-bold mb-2">{title}</h2>

    <dl tw="font-mono pb-4 space-y-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <dt tw="pr-4 text-gray-600">{key}</dt>
          <dd tw="mt-1 text-gray-900 text-sm">
            <DataValue value={JSON.stringify(value, null, 2)} />
          </dd>
        </div>
      ))}
    </dl>
  </div>
)

const clamp = css({
  maxWidth: "100%",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
})

const DataValue = ({ value }: { value: Data.Value }) => {
  return (
    <div tw="w-auto break-all resize-none" css={clamp}>
      {value}
    </div>
  )
}
