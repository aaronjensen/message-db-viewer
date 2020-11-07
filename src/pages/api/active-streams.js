import { pool } from "@lib/db/pool"

export default async (req, res) => {
  const result = await pool.query(
    `SELECT DISTINCT stream_name, MAX(global_position) FROM messages GROUP BY stream_name ORDER BY max(global_position) DESC LIMIT 25`
  )

  res.statusCode = 200
  res.json(result.rows.map((row) => row.stream_name))
}
