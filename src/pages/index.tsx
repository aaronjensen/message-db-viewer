import * as React from "react"
import { useRouter } from "next/router"
import "twin.macro"
import { SuspenseOnClient } from "@components/suspense"
import { StreamList } from "@components/stream_list"
import { parseStreamNames } from "@lib/router"

const Loading = () => <div>Loading</div>

export default function Home() {
  const router = useRouter()

  let streamNames = parseStreamNames(router.query.streamNames)

  return (
    <SuspenseOnClient fallback={<Loading />}>
      <StreamList names={streamNames} />
    </SuspenseOnClient>
  )
}
