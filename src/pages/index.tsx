import { useEffect } from "react"
import { useRouter } from "next/router"
import "twin.macro"
import { Stream } from "@components/stream"
import { atom, useAtom } from "jotai"
import { useUpdateAtom } from "jotai/utils.cjs"

const queryStreamNamesAtom = atom<string[] | string | undefined>(undefined)

const streamNamesAtom = atom((get) => {
  let streamNames = get(queryStreamNamesAtom) || []

  if (!Array.isArray(streamNames)) {
    streamNames = [streamNames]
  }
  streamNames = streamNames.flatMap((s) => s.split(","))

  return streamNames
})

export default function Home() {
  const router = useRouter()

  let queryStreamNames = router.query.streamNames
  const setQueryStreamNames = useUpdateAtom(queryStreamNamesAtom)

  useEffect(() => {
    setQueryStreamNames(queryStreamNames)
  }, [queryStreamNames])

  const [streamNames] = useAtom(streamNamesAtom)

  return (
    <div tw="p-4 flex flex-col gap-8">
      {streamNames.map((streamName) => (
        <div key={streamName}>
          <div tw="z-10 absolute bg-white bg-opacity-75">{streamName}</div>
          <div tw="z-0 mt-8">
            <Stream streamName={streamName} />
          </div>
        </div>
      ))}
    </div>
  )
}
