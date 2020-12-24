import { pool } from "@lib/db/pool"

const escapeLiteral = (str) => {
  let hasBackslash = false
  let escaped = "'"

  for (let i = 0; i < str.length; i++) {
    let c = str[i]
    if (c === "'") {
      escaped += c + c
    } else if (c === "\\") {
      escaped += c + c
      hasBackslash = true
    } else {
      escaped += c
    }
  }

  escaped += "'"

  if (hasBackslash === true) {
    escaped = " E" + escaped
  }

  return escaped
}

const parseRow = (row) => ({
  ...row,
  data: JSON.parse(row.data),
  metadata: JSON.parse(row.metadata),
})

export default async (req, res) => {
  const {
    query: { name },
  } = req

  const streamName = name
  const position = 0
  const batchSize = 100
  let condition = null

  let result
  if (streamName.includes("*")) {
    const category = streamName.split("-")[0]
    const correlation = null
    const consumerGroupMember = null
    const consumerGroupSize = null
    const pattern = streamName.replace(/\*/g, "%")
    const escapedPattern = escapeLiteral(pattern)
    condition = `stream_name like ${escapedPattern}`

    const parameters =
      "$1::varchar, $2::bigint, $3::bigint, $4::varchar, $5::bigint, $6::bigint, $7::varchar"
    const values = [
      category,
      position,
      batchSize,
      correlation,
      consumerGroupMember,
      consumerGroupSize,
      condition,
    ]

    result = await pool.query(
      `SELECT * from get_category_messages(${parameters})`,
      values
    )
  } else {
    const parameters = "$1::varchar, $2::bigint, $3::bigint, $4::varchar"
    const values = [streamName, position, batchSize, condition]

    result = await pool.query(
      `SELECT * from get_stream_messages(${parameters})`,
      values
    )
  }

  res.statusCode = 200
  res.json(result.rows.map(parseRow))
}
