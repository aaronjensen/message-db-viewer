import { uniq } from "lodash"

export const parseStreamNames = (query: string | string[] = []) => {
  let streamNames = query
  if (!Array.isArray(streamNames)) {
    streamNames = [streamNames]
  }
  streamNames = streamNames.flatMap((s) => s.split(","))

  return uniq(streamNames)
}
