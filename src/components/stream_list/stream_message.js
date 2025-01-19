import * as React from "react"
import Xarrow from "@components/xarrow"

export const StreamMessage = ({ message, selected, selectMessage }) => {
  const ref = React.useRef(null)
  const causationStreamName = message.metadata?.causationMessageStreamName
  const causationPosition = message.metadata?.causationMessagePosition

  return (
    <>
      <div
        className={`border-4 rounded transition-colors duration-75 ease-in ${
          selected ? "border-blue-400" : "border-transparent"
        }`}
      >
        <div
          ref={ref}
          id={`message-${message.stream_name}-${message.position}`}
          className="cursor-pointer px-4 py-2 bg-white flex flex-col rounded bg-opacity-95 shadow-sm"
          onClick={() =>
            selected ? selectMessage(null) : selectMessage(message)
          }
        >
          <div className="mb-1">{message.type}</div>
          <div className="grid grid-cols-2 gap-x-2 text-sm">
            <div>Pos:</div>
            <div className="text-right">{message.position}</div>

            <div>GP:</div>
            <div className="text-right">{message.global_position}</div>
          </div>
        </div>
      </div>

      {causationPosition != null && (
        <Xarrow
          color="#3B82F6"
          strokeWidth={2}
          start={`message-${causationStreamName}-${causationPosition}`}
          end={ref}
          startAnchor={[
            {
              position: "bottom",
              offset: { rightness: 10, bottomness: 0 },
            },
            {
              position: "top",
              offset: { rightness: 10, bottomness: 0 },
            },
          ]}
          endAnchor={[
            {
              position: "bottom",
              offset: { rightness: -10, bottomness: 0 },
            },
            {
              position: "top",
              offset: { rightness: -10, bottomness: 0 },
            },
          ]}
        />
      )}
    </>
  )
}
