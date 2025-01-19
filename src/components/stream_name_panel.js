import { CausationStreams } from "@components/stream_name_panel/causation_streams"
import { ActiveStreams } from "@components/stream_name_panel/active_streams"
import { SpecificStream } from "@components/stream_name_panel/specific_stream"
import useSWR from "swr"

const fetchJSON = (url) => fetch(url).then((res) => res.json())

export const StreamNamePanel = ({ selectedStreamNames, streams }) => {
  let { data: activeStreamNames } = useSWR(`/api/active-streams`, fetchJSON, {
    refreshInterval: 500,
  })

  return (
    <div className="bg-gray-800 px-3 py-4 flex flex-col gap-8 shadow-lg w-[320px]">
      <CausationStreams
        selectedStreamNames={selectedStreamNames}
        activeStreamNames={activeStreamNames}
        streams={streams}
      />

      <ActiveStreams
        selectedStreamNames={selectedStreamNames}
        activeStreamNames={activeStreamNames}
      />

      <SpecificStream />
    </div>
  )
}
