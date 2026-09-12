import { ConfigService } from "@nestjs/config"
import type { TypeOrmModuleOptions } from "@nestjs/typeorm"

import type { AllConfigs } from "../interfaces"

import { UserEntity } from "@/modules/users/entities/user.entity"

export const getTypeOrmConfig = (
	config: ConfigService<AllConfigs>
): TypeOrmModuleOptions => {
	return {
		type: "postgres",
		host: config.get("database.host", { infer: true }),
		port: config.get("database.port", { infer: true }),
		username: config.get("database.user", { infer: true }),
		password: config.get("database.password", { infer: true }),
		synchronize: config.get("database.sync", { infer: true }),
		database: config.get("database.name", { infer: true }),
		logging: config.get("database.logging", { infer: true }),
		entities: [UserEntity]
	}
}
