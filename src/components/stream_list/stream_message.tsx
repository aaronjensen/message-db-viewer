import * as React from "react"
import Xarrow from "@components/xarrow"
import { usePopper } from "react-popper"
import { css } from "twin.macro"
import "twin.macro"
import * as Data from "@data"

export const StreamMessage = ({ message }: { message: Data.Message }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const causationPosition = message.metadata?.causationMessageGlobalPosition

  const [showTooltip, setShowTooltip] = React.useState(false)
  const [
    referenceElement,
    setReferenceElement,
  ] = React.useState<HTMLElement | null>()
  const [popperElement, setPopperElement] = React.useState<HTMLElement | null>()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "auto-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [5, 5],
        },
      },
    ],
  })

  return (
    <>
      <div
        ref={setReferenceElement}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          ref={ref}
          id={`message-${message.global_position}`}
          tw="border px-4 py-2 bg-white flex flex-col"
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

      {showTooltip && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          tw="z-20"
          {...attributes.popper}
        >
          <MessageDetail message={message} />
        </div>
      )}

      {message.metadata && causationPosition && (
        <Xarrow
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

const MessageDetail = ({ message }: { message: Data.Message }) => {
  return (
    <div tw="bg-white p-4 border max-w-2xl z-50 text-xs">
      <h1 tw="text-base font-bold mb-3">{message.type}</h1>
      <div tw="font-mono mb-4">
        Stream Name: <span tw="ml-4">{message.stream_name}</span>
      </div>
      <DataTable title="Data" data={message.data} />

      {message.metadata && (
        <DataTable title="Metadata" data={message.metadata} />
      )}
    </div>
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
