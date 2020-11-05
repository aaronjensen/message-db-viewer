import useSWR from "swr"
import { StreamMessage } from "@components/stream_message"
import { Message } from "@data/message"
import "twin.macro"

const fetchJSON = (url: string) => fetch(url).then((res) => res.json())

export const Stream = ({ streamName }: { streamName: string }) => {
  const { data } = useSWR<Message[]>(`/api/stream/${streamName}`, fetchJSON, {
    refreshInterval: 500,
  })

  return (
    <div
      tw="grid grid-flow-col auto-cols-max gap-2 border p-2 bg-gray-100"
      css={{ width: "max-content" }}
    >
      {data &&
        data.map((message) => (
          <StreamMessage key={message.id} message={message} />
        ))}
    </div>
  )
}
