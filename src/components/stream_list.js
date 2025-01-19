import React, { useState, useLayoutEffect, useCallback } from "react"
import useSWR from "swr"
import { StreamNamePanel } from "@components/stream_name_panel"
import { Stream } from "@components/stream_list/stream"
import { SelectedMessage } from "@components/stream_list/selected_message"

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
    <div className="flex min-h-screen w-full">
      <div className="h-screen overflow-y-auto">
        <StreamNamePanel selectedStreamNames={names} streams={streams} />
      </div>

      <div className="flex-1 h-screen overflow-y-auto relative bg-gray-50">
        <div className="absolute inset-0 z-0">
          {/* Arrow container */}
        </div>
        
        <div className="pl-8 pr-8 pt-4 pb-32 relative z-10">
          {names.map((name) => (
            <FetchStream
              key={name}
              name={name}
              setStream={setStream}
              clearStream={clearStream}
            />
          ))}

          <div className="flex flex-col gap-8">
            {streams.map((stream) => (
              <Stream
                key={stream.name + streams.length}
                stream={stream}
                selectedMessage={selectedMessage}
                selectMessage={selectMessage}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedMessage && (
        <div className="h-screen overflow-y-auto w-[384px] shadow-[-8px_0_16px_-6px_rgba(0,0,0,0.1)] relative z-20">
          <div className="w-full h-full">
            <SelectedMessage
              message={selectedMessage}
              close={() => selectMessage(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
