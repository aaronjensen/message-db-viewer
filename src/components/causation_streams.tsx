import { uniq, difference, compact } from "lodash"
import { useRouter } from "next/router"
import * as Data from "@data"
import { parseStreamNames } from "@lib/router"
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

const Button = (props: any) => (
  <button
    tw="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 active:text-gray-800 active:bg-gray-100 transition duration-150 ease-in-out"
    {...props}
  />
)

export const CausationStreams = ({
  selectedStreamNames,
  streams,
}: CausationStreamsProps) => {
  const allMessages = streams.flatMap((stream) => stream.messages)
  const router = useRouter()

  const addStream = (name: string) => {
    let streamNames = parseStreamNames(router.query.streamNames)
    streamNames.push(name)
    streamNames = uniq(streamNames)

    router.push({
      pathname: "/",
      query: { streamNames: streamNames.join(",") },
    })
  }

  let causationStreamNames = compact(
    allMessages.map((message) => message.metadata?.causationMessageStreamName)
  )
  causationStreamNames = causationStreamNames.filter(validStreamName)
  causationStreamNames = uniq(causationStreamNames)
  causationStreamNames = uniqByCardinalID(causationStreamNames)
  causationStreamNames = difference(causationStreamNames, selectedStreamNames)

  return causationStreamNames.length > 0 ? (
    <div>
      <h2 tw="font-bold">Causation Streams</h2>
      <ul>
        {causationStreamNames.map((name) => (
          <li>
            <Button onClick={() => addStream(name)}>{name}</Button>
          </li>
        ))}
      </ul>
    </div>
  ) : null
}
