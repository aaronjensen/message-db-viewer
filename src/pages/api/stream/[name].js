// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Pool } from "pg"
import settings from "../../../settings/message_store_postgres.json"

const pool = new Pool(settings)

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
  const condition = null

  let result
  if (streamName.endsWith("*")) {
    const category = streamName.split("-")[0]
    const correlation = null
    const consumerGroupMember = null
    const consumerGroupSize = null
    const pattern = streamName.replace(/\*/g, "%")

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
      pattern,
    ]

    result = await pool.query(
      `SELECT * from get_category_messages(${parameters}) WHERE stream_name like $8`,
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
