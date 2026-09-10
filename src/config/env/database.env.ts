import { registerAs } from "@nestjs/config"

import type { DatabaseConfig } from "../interfaces/database.interface"
import { DatabaseValidator } from "../validators"

import { validateEnv } from "@/shared/utils"

export const databaseEnv = registerAs<DatabaseConfig>("database", () => {
	const valdated = validateEnv(process.env, DatabaseValidator)

	return {
		user: valdated.DATABASE_USER,
		password: valdated.DATABASE_PASS,
		host: valdated.DATABASE_HOST,
		port: valdated.DATABASE_PORT,
		name: valdated.DATABASE_NAME,
		logging: valdated.DATABASE_LOGGING,
		sync: valdated.DATABASE_SYNC
	}
})
