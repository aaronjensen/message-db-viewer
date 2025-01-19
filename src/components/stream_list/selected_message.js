import { CopyButton } from "@components/copy_button"

export const SelectedMessage = ({ message, close }) => {
  return (
    <section
      className="bg-white flex flex-col w-full h-full"
      aria-labelledby="slide-over-heading"
    >
      <div className="py-6 px-6 bg-blue-700">
        <div className="flex items-center justify-between">
          <h2
            id="slide-over-heading"
            className="text-lg font-medium text-white"
          >
            {message.type}
          </h2>
          <div className="ml-3 h-7 flex items-center">
            <button
              className="bg-blue-700 rounded-md text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              onClick={close}
            >
              <span className="sr-only">Close panel</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-3 text-xs font-mono">
          <dl className="grid grid-cols-2 gap-3">
            <div className="col-span-2 group">
              <dt className="pr-4 text-blue-300">streamName</dt>
              <dd className="mt-1 text-blue-200 truncate text-sm">
                <DataValue value={message.stream_name} />
              </dd>
            </div>
            <div className="group">
              <dt className="pr-4 text-blue-300">position</dt>
              <dd className="mt-1 text-blue-200 text-sm">
                <DataValue value={message.position} />
              </dd>
            </div>
            <div className="group">
              <dt className="pr-4 text-blue-300">globalPosition</dt>
              <dd className="mt-1 text-blue-200 text-sm">
                <DataValue value={message.global_position} />
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="px-6 py-6 text-xs flex-1">
        <DataTable title="Data" data={message.data} />

        {message.metadata && (
          <DataTable title="Metadata" data={message.metadata} />
        )}
      </div>
    </section>
  )
}

const DataTable = ({ title, data }) => (
  <div>
    <h2 className="text-sm font-bold mb-2">{title}</h2>

    <dl className="font-mono pb-4 space-y-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="group">
          <dt className="pr-4 text-gray-600">{key}</dt>
          <dd className="mt-1 text-gray-900 text-sm">
            <DataValue value={JSON.stringify(value, null, 2)} />
          </dd>
        </div>
      ))}
    </dl>
  </div>
)

const HeaderDataValue = ({ value }) => {
  return (
    <div className="flex items-start gap-2">
      <div className="w-auto break-all resize-none whitespace-pre overflow-auto flex-grow no-scrollbar">
        <pre>{value}</pre>
      </div>
      <CopyButton value={value} variant="header" />
    </div>
  )
}

const DataValue = ({ value }) => {
  return (
    <div className="flex items-start gap-2">
      <div className="w-auto break-all resize-none whitespace-pre overflow-auto flex-grow no-scrollbar">
        <pre>{value}</pre>
      </div>
      <CopyButton value={value} />
    </div>
  )
}
