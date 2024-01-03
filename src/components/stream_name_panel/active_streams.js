import { addableStreamNames } from "@lib/stream_names"
import React from "react"
import useSWR from "swr"
import { StreamNameList } from "@components/stream_name_panel/stream_name_list"

const fetchJSON = (url) => fetch(url).then((res) => res.json())

export const ActiveStreams = ({ selectedStreamNames }) => {
  let { data: activeStreamNames } = useSWR(`/api/active-streams`, fetchJSON, {
    refreshInterval: 500,
  })

  if (!activeStreamNames) return null

  activeStreamNames = addableStreamNames(activeStreamNames, selectedStreamNames)

  if (activeStreamNames.length === 0) return null

  return (
    <StreamNameList title="Active Streams" streamNames={activeStreamNames} />
  )
}
