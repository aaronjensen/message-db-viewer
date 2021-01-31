import * as React from "react"
import Xarrow from "@components/xarrow"
import tw from "twin.macro"
import * as Data from "@data"

export const StreamMessage = ({
  message,
  selected,
  selectMessage,
}: {
  message: Data.Message
  selected: boolean
  selectMessage: (message: Data.Message | null) => void
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const causationPosition = message.metadata?.causationMessageGlobalPosition

  return (
    <>
      <div
        tw="border-4 rounded transition-colors duration-75 ease-in z-10"
        css={selected ? tw`border-blue-400` : tw`border-transparent`}
      >
        <div
          ref={ref}
          id={`message-${message.global_position}`}
          tw="cursor-pointer px-4 py-2 bg-white flex flex-col rounded bg-opacity-95 shadow-sm"
          onClick={() =>
            selected ? selectMessage(null) : selectMessage(message)
          }
        >
          <div>{message.type}</div>
          <div tw="grid grid-cols-2 gap-x-2">
            <div>Pos:</div>
            <div tw="text-right">{message.position}</div>

            <div>GP:</div>
            <div tw="text-right">{message.global_position}</div>
          </div>
        </div>
      </div>

      {message.metadata && causationPosition && (
        <Xarrow
          color="#3B82F6"
          strokeWidth={2}
          start={`message-${causationPosition}`}
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
