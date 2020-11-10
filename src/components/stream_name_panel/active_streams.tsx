import { addableStreamNames } from "@lib/stream_names"
import React from "react"
import useSWR from "swr"
import { StreamNameList } from "@components/stream_name_panel/stream_name_list"

const fetchJSON = (url: string) => fetch(url).then((res) => res.json())

export const ActiveStreams = ({
  selectedStreamNames,
}: {
  selectedStreamNames: string[]
}) => {
  let { data: activeStreamNames } = useSWR<string[]>(
    `/api/active-streams`,
    fetchJSON,
    {
      refreshInterval: 500,
    }
  )

  if (!activeStreamNames) return null

  activeStreamNames = addableStreamNames(activeStreamNames, selectedStreamNames)

  if (activeStreamNames.length === 0) return null

  return (
    <StreamNameList title="Active Streams" streamNames={activeStreamNames} />
  )
}
