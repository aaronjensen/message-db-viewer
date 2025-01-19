import { CausationStreams } from "@components/stream_name_panel/causation_streams"
import { ActiveStreams } from "@components/stream_name_panel/active_streams"
import { SpecificStream } from "@components/stream_name_panel/specific_stream"
import { clearStreams } from "@lib/router"
import { useRouter } from "next/router"
import useSWR from "swr"

const fetchJSON = (url) => fetch(url).then((res) => res.json())

export const StreamNamePanel = ({ selectedStreamNames, streams }) => {
  const router = useRouter()
  let { data: activeStreamNames } = useSWR(`/api/active-streams`, fetchJSON, {
    refreshInterval: 500,
  })

  return (
    <div className="bg-gray-800 px-3 py-4 flex flex-col gap-8 w-[320px] h-full relative">
      {selectedStreamNames.length > 0 && (
        <button
          onClick={() => clearStreams(router)}
          className="absolute top-5 right-5 text-sm text-gray-300 hover:text-white transition-colors duration-150"
        >
          Reset
        </button>
      )}

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
