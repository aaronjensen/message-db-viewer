import { CausationStreams } from "@components/stream_name_panel/causation_streams"
import { ActiveStreams } from "@components/stream_name_panel/active_streams"
import { SpecificStream } from "@components/stream_name_panel/specific_stream"
import "twin.macro"

export const StreamNamePanel = ({ selectedStreamNames, streams }) => {
  return (
    <div
      tw="bg-gray-800 px-3 py-4 flex flex-col gap-8 shadow-lg"
      css={{ width: 320 }}
    >
      <CausationStreams
        selectedStreamNames={selectedStreamNames}
        streams={streams}
      />

      <ActiveStreams selectedStreamNames={selectedStreamNames} />

      <SpecificStream />
    </div>
  )
}
