import { uniq, difference, compact } from "lodash"
import { useRouter } from "next/router"
import * as Data from "@data"
import { addStream } from "@lib/router"
import { Button } from "@components/button"
import "twin.macro"

interface CausationStreamsProps {
  selectedStreamNames: string[]
  streams: Data.Stream[]
}

const cardinalIDWildcard = (name: string) => {
  const parts = name.split("+")
  if (parts.length > 1) {
    return `${parts[0]}+*`
  }

  return name
}

const uniqByCardinalID = (names: string[]) =>
  uniq(names.map(cardinalIDWildcard))

const validStreamName = (streamName: string) => streamName.includes("-")

export const CausationStreams = ({
  selectedStreamNames,
  streams,
}: CausationStreamsProps) => {
  const allMessages = streams.flatMap((stream) => stream.messages)
  const router = useRouter()

  let causationStreamNames = compact(
    allMessages.map((message) => message.metadata?.causationMessageStreamName)
  )
  causationStreamNames = causationStreamNames.filter(validStreamName)
  causationStreamNames = uniq(causationStreamNames)
  causationStreamNames = uniqByCardinalID(causationStreamNames)
  causationStreamNames = difference(causationStreamNames, selectedStreamNames)

  return causationStreamNames.length > 0 ? (
    <div>
      <h2 tw="font-bold mb-2">Causation Streams</h2>
      <ul>
        {causationStreamNames.map((name) => (
          <li key={name}>
            <Button onClick={() => addStream(router, name)}>{name}</Button>
          </li>
        ))}
      </ul>
    </div>
  ) : null
}
