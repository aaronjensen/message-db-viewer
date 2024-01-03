import React, { useState, useLayoutEffect, useCallback } from "react"
import useSWR from "swr"
import { StreamNamePanel } from "@components/stream_name_panel"
import { Stream } from "@components/stream_list/stream"
import { SelectedMessage } from "@components/stream_list/selected_message"
import tw from "twin.macro"

const fetchJSON = (url) => fetch(url).then((res) => res.json())

const FetchStream = ({ name, setStream, clearStream }) => {
  const { data: messages } = useSWR(`/api/stream/${name}`, fetchJSON, {
    refreshInterval: 500,
  })

  useLayoutEffect(() => {
    if (messages) {
      setStream(name, messages)
    }
    return () => clearStream(name)
  }, [setStream, clearStream, messages])

  return null
}

const sortStreams = (streams) =>
  streams.sort((a, b) => {
    const posA = a.messages[0]?.global_position ?? Infinity
    const posB = b.messages[0]?.global_position ?? Infinity

    return posA - posB
  })

const setStreamInList = (streams, stream) => {
  streams = streams.filter((s) => s.name !== stream.name)
  streams.push(stream)
  return sortStreams(streams)
}

export const StreamList = ({ names }) => {
  const [streams, setStreams] = useState([])
  const [selectedMessage, selectMessage] = useState(null)

  const setStream = useCallback(
    (name, messages) => {
      setStreams((streams) => setStreamInList(streams, { name, messages }))
    },
    [setStreams]
  )

  const clearStream = useCallback(
    (name) => {
      setStreams((streams) => streams.filter((s) => s.name !== name))
    },
    [setStreams]
  )

  return (
    <div
      tw="flex gap-4 min-h-screen items-stretch"
      css={{ width: "max-content" }}
    >
      <StreamNamePanel selectedStreamNames={names} streams={streams} />

      <div tw="p-4 pb-32 flex-1 flex flex-col gap-8">
        {names.map((name) => (
          <FetchStream
            key={name}
            name={name}
            setStream={setStream}
            clearStream={clearStream}
          />
        ))}

        {streams.map((stream) => (
          // Include the streams length in the key to work around arrows not being
          // redrawn when a stream is removed
          <Stream
            key={stream.name + streams.length}
            stream={stream}
            selectedMessage={selectedMessage}
            selectMessage={selectMessage}
          />
        ))}
      </div>

      {selectedMessage && (
        <SelectedMessage
          message={selectedMessage}
          close={() => selectMessage(null)}
        />
      )}
    </div>
  )
}
