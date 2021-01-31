import React, { useState, useLayoutEffect, useCallback } from "react"
import useSWR from "swr"
import { StreamNamePanel } from "@components/stream_name_panel"
import { Stream } from "@components/stream_list/stream"
import { SelectedMessage } from "@components/stream_list/selected_message"
import tw from "twin.macro"
import * as Data from "@data"

const fetchJSON = (url: string) => fetch(url).then((res) => res.json())

const FetchStream = ({
  name,
  setStream,
  clearStream,
}: {
  name: string
  setStream: (name: string, messages: Data.Message[]) => void
  clearStream: (name: string) => void
}) => {
  const { data: messages } = useSWR<Data.Message[]>(
    `/api/stream/${name}`,
    fetchJSON,
    {
      refreshInterval: 500,
    }
  )

  useLayoutEffect(() => {
    if (messages) {
      setStream(name, messages)
    }
    return () => clearStream(name)
  }, [setStream, clearStream, messages])

  return null
}

const sortStreams = (streams: Data.Stream[]) =>
  streams.sort((a, b) => {
    const posA = a.messages[0]?.global_position ?? Infinity
    const posB = b.messages[0]?.global_position ?? Infinity

    return posA - posB
  })

const setStreamInList = (streams: Data.Stream[], stream: Data.Stream) => {
  streams = streams.filter((s) => s.name !== stream.name)
  streams.push(stream)
  return sortStreams(streams)
}

export const StreamList = ({ names }: { names: string[] }) => {
  const [streams, setStreams] = useState<Data.Stream[]>([])
  const [selectedMessage, selectMessage] = useState<Data.Message | null>(null)

  const setStream = useCallback(
    (name: string, messages: Data.Message[]) => {
      setStreams((streams) => setStreamInList(streams, { name, messages }))
    },
    [setStreams]
  )

  const clearStream = useCallback(
    (name: string) => {
      setStreams((streams) => streams.filter((s) => s.name !== name))
    },
    [setStreams]
  )

  return (
    <div tw="flex gap-4 min-h-screen items-stretch">
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
