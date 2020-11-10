import { compact } from "lodash"
import * as Data from "@data"
import "twin.macro"
import { addableStreamNames } from "@lib/stream_names"
import { StreamNameList } from "@components/stream_name_panel/stream_name_list"

interface CausationStreamsProps {
  selectedStreamNames: string[]
  streams: Data.Stream[]
}

export const CausationStreams = ({
  selectedStreamNames,
  streams,
}: CausationStreamsProps) => {
  const allMessages = streams.flatMap((stream) => stream.messages)

  let causationStreamNames = compact(
    allMessages.map((message) => message.metadata?.causationMessageStreamName)
  )
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
