import { registerAs } from "@nestjs/config"

import type { DatabaseConfig } from "../interfaces/database.interface"
import { DatabaseValidator } from "../validators"

import { validateEnv } from "@/shared/utils"

export const databaseEnv = registerAs<DatabaseConfig>("database", () => {
	validateEnv(process.env, DatabaseValidator)

	return {
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASS,
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT),
		name: process.env.DATABASE_NAME,
		logging: process.env.DATABASE_LOGGING as any,
		sync: process.env.DATABASE_SYNC as any
	}
})
