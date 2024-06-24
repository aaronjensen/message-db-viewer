import { addableStreamNames } from "@lib/stream_names"
import React from "react"
import { StreamNameList } from "@components/stream_name_panel/stream_name_list"

export const ActiveStreams = ({ selectedStreamNames, activeStreamNames }) => {
  if (!activeStreamNames) return null

  activeStreamNames = addableStreamNames(activeStreamNames, selectedStreamNames)

  if (activeStreamNames.length === 0) return null

  return (
    <StreamNameList title="Active Streams" streamNames={activeStreamNames} />
  )
}
