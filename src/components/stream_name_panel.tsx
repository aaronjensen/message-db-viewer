import { CausationStreams } from "@components/causation_streams"
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
    <div tw="mr-4 bg-gray-300 h-screen p-4 flex flex-col gap-8">
      <AddStream />

      <CausationStreams
        selectedStreamNames={selectedStreamNames}
        streams={streams}
      />
    </div>
  )
}
