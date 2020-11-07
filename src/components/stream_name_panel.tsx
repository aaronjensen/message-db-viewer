import { CausationStreams } from "@components/causation_streams"
import { ActiveStreams } from "@components/active_streams"
import { AddStream } from "@components/add_stream"
import * as Data from "@data"
import "twin.macro"

export const StreamNamePanel = ({
  selectedStreamNames,
  streams,
}: {
  selectedStreamNames: string[]
  streams: Data.Stream[]
}) => {
  return (
    <div tw="bg-gray-300 p-4 flex flex-col gap-8 h-full shadow-lg">
      <AddStream />

      <CausationStreams
        selectedStreamNames={selectedStreamNames}
        streams={streams}
      />

      <ActiveStreams selectedStreamNames={selectedStreamNames} />
    </div>
  )
}
