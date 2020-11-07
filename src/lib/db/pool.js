import { Pool } from "pg"
import settings from "@settings/message_store_postgres.json"

export const pool = new Pool(settings)
