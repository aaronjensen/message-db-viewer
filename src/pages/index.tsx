import * as React from "react"
import { useRouter } from "next/router"
import "twin.macro"
import { Stream } from "@components/stream"

export default function Home() {
  const router = useRouter()

  let streamNames = router.query.streamNames || []
  if (!Array.isArray(streamNames)) {
    streamNames = [streamNames]
  }
  streamNames = streamNames.flatMap((s) => s.split(","))

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
