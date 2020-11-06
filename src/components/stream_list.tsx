import { useState, useEffect, useCallback } from "react"
import useSWR from "swr"
import { Stream } from "@components/stream"
import "twin.macro"
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
      suspense: true,
    }
  )

  useEffect(() => {
    if (messages) {
      setStream(name, messages)
    }
    return () => clearStream(name)
  }, [setStream, clearStream, messages])

  return null
}

export const StreamList = ({ names }: { names: string[] }) => {
  const [streams, setStreams] = useState<Record<string, Data.Stream>>({})

  const setStream = useCallback(
    (name: string, messages: Data.Message[]) => {
      setStreams((streams) => ({ ...streams, [name]: { name, messages } }))
    },
    [setStreams]
  )

  const clearStream = useCallback(
    (name: string) => {
      setStreams(({ [name]: _removed, ...streams }) => streams)
    },
    [setStreams]
  )

  console.log(streams)

  return (
    <div tw="p-4 flex flex-col gap-8">
      {names.map((name) => (
        <FetchStream
          key={name}
          name={name}
          setStream={setStream}
          clearStream={clearStream}
        />
      ))}
      {Object.values(streams).map((stream) => (
        <div key={stream.name}>
          <div tw="z-10 absolute bg-white bg-opacity-75">{stream.name}</div>
          <div tw="z-0 mt-8">
            <Stream stream={stream} />
          </div>
        </div>
      ))}
    </div>
  )
}
