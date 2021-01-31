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
    <>
      <section
        tw="sticky top-0 bottom-0 right-0 z-10 flex-none overflow-y-auto inset-y-0 pl-10 max-w-full flex"
        aria-labelledby="slide-over-heading"
      >
        <div tw="w-screen max-w-md">
          <div tw="h-full flex flex-col py-6 bg-gray-50 shadow-xl overflow-y-scroll">
            <div tw="px-4 sm:px-6">
              <div tw="flex items-start justify-between">
                <h2
                  id="slide-over-heading"
                  tw="text-lg font-medium text-gray-900"
                >
                  {message.type}
                </h2>
                <div tw="ml-3 h-7 flex items-center">
                  <button
                    tw="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            </div>
            <div tw="mt-6 relative flex-1 px-4 sm:px-6 text-xs">
              <div tw="absolute inset-0 px-4 sm:px-6">
                <div tw="font-mono mb-4">
                  Stream Name: <span tw="ml-4">{message.stream_name}</span>
                </div>
                <DataTable title="Data" data={message.data} />

                {message.metadata && (
                  <DataTable title="Metadata" data={message.metadata} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {false && (
        <div
          tw="sticky top-0 bottom-0 right-0 z-10 bg-white p-4 border text-xs flex-none h-screen overflow-y-auto"
          css={{ width: 500 }}
        >
          <h1 tw="text-base font-bold mb-3"></h1>
          <button tw="cursor-pointer" onClick={close}>
            X
          </button>
          <div tw="font-mono mb-4">
            Stream Name: <span tw="ml-4">{message.stream_name}</span>
          </div>
          <DataTable title="Data" data={message.data} />

          {message.metadata && (
            <DataTable title="Metadata" data={message.metadata} />
          )}
        </div>
      )}
    </>
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

    <table tw="font-mono mb-4">
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr tw="align-top" key={key}>
            <td tw="pr-4">{key}:</td>
            <td>
              <DataValue value={JSON.stringify(value, null, 2)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
