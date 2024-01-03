import { uniq, difference } from "lodash"

const cardinalIDWildcard = (name) => {
  const parts = name.split("+")
  if (parts.length > 1) {
    return `${parts[0]}+*`
  }

  return name
}

const uniqByCardinalID = (names) => uniq(names.map(cardinalIDWildcard))

const validStreamName = (streamName) => streamName.includes("-")

export const addableStreamNames = (streamNames, selectedStreamNames) => {
  streamNames = streamNames.filter(validStreamName)
  streamNames = uniq(streamNames)
  streamNames = uniqByCardinalID(streamNames)
  streamNames = difference(streamNames, selectedStreamNames)

  return streamNames
}
