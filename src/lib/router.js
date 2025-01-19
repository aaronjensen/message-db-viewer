import { uniq, compact } from "lodash"

export const parseStreamNames = (query = []) => {
  let streamNames = query
  if (!Array.isArray(streamNames)) {
    streamNames = [streamNames]
  }
  streamNames = streamNames.flatMap((s) => s.split(","))
  streamNames = compact(streamNames)

  return uniq(streamNames)
}

export const addStream = (router, name) => {
  let streamNames = parseStreamNames(router.query.streamNames)
  streamNames.push(name)
  streamNames = uniq(streamNames)

  router.push({
    pathname: "/",
    query: { streamNames: streamNames.join(",") },
  })
}

export const removeStream = (router, name) => {
  let streamNames = parseStreamNames(router.query.streamNames)
  streamNames = streamNames.filter((n) => n !== name)

  router.push({
    pathname: "/",
    query: { streamNames: streamNames.join(",") },
  })
}

export const clearStreams = (router) => {
  router.push({
    pathname: "/",
    query: {},
  })
}
