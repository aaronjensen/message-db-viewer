import { uniq, compact } from "lodash"
import { NextRouter } from "next/router"

export const parseStreamNames = (query: string | string[] = []) => {
  let streamNames = query
  if (!Array.isArray(streamNames)) {
    streamNames = [streamNames]
  }
  streamNames = streamNames.flatMap((s) => s.split(","))
  streamNames = compact(streamNames)

  return uniq(streamNames)
}

export const addStream = (router: NextRouter, name: string) => {
  let streamNames = parseStreamNames(router.query.streamNames)
  streamNames.push(name)
  streamNames = uniq(streamNames)

  router.push({
    pathname: "/",
    query: { streamNames: streamNames.join(",") },
  })
}

export const removeStream = (router: NextRouter, name: string) => {
  let streamNames = parseStreamNames(router.query.streamNames)
  streamNames = streamNames.filter((n) => n !== name)

  router.push({
    pathname: "/",
    query: { streamNames: streamNames.join(",") },
  })
}
