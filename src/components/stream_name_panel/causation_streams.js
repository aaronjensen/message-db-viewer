import { compact, intersection } from "lodash"
import { addableStreamNames } from "@lib/stream_names"
import { StreamNameList } from "@components/stream_name_panel/stream_name_list"

export const CausationStreams = ({
  selectedStreamNames,
  activeStreamNames,
  streams,
}) => {
  const allMessages = streams.flatMap((stream) => stream.messages)

  let causationStreamNames = compact(
    allMessages.map((message) => message.metadata?.causationMessageStreamName)
  )

  causationStreamNames = intersection(causationStreamNames, activeStreamNames)

  causationStreamNames = addableStreamNames(
    causationStreamNames,
    selectedStreamNames
  )

  return causationStreamNames.length > 0 ? (
    <StreamNameList
      title="Causation Message Streams"
      streamNames={causationStreamNames}
    />
  ) : null
}
