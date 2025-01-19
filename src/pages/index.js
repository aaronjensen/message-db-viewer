import * as React from "react"
import { useRouter } from "next/router"
import { StreamList } from "@components/stream_list"
import { parseStreamNames } from "@lib/router"

const Loading = () => <div>Loading</div>

export default function Home() {
  const router = useRouter()

  let streamNames = parseStreamNames(router.query.streamNames)

  return (
    <React.Suspense>
      <StreamList names={streamNames} />
    </React.Suspense>
  )
}
