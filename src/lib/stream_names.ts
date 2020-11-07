import { uniq, difference } from "lodash"

const cardinalIDWildcard = (name: string) => {
  const parts = name.split("+")
  if (parts.length > 1) {
    return `${parts[0]}+*`
  }

  return name
}

const uniqByCardinalID = (names: string[]) =>
  uniq(names.map(cardinalIDWildcard))

const validStreamName = (streamName: string) => streamName.includes("-")

export const addableStreamNames = (
  streamNames: string[],
  selectedStreamNames: string[]
) => {
  streamNames = streamNames.filter(validStreamName)
  streamNames = uniq(streamNames)
  streamNames = uniqByCardinalID(streamNames)
  streamNames = difference(streamNames, selectedStreamNames)

  return streamNames
}
