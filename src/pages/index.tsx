import * as React from "react"
import { useRouter } from "next/router"
import "twin.macro"
import { Stream } from "@components/stream"
import { SuspenseOnClient } from "@components/suspense"
import { StreamList } from "@components/stream_list"

const Loading = () => <div>Loading</div>

export default function Home() {
  const router = useRouter()

  let streamNames = router.query.streamNames || []
  if (!Array.isArray(streamNames)) {
    streamNames = [streamNames]
  }
  streamNames = streamNames.flatMap((s) => s.split(","))

  return (
    <div tw="p-4 flex flex-col gap-8">
      <SuspenseOnClient fallback={<Loading />}>
        <StreamList names={streamNames} />
      </SuspenseOnClient>
    </div>
  )
}
