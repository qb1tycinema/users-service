import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { databaseEnv, environemtEnv, grpcEnv, jaegerEnv } from "./config/env"
import { DatabaseModule } from "./infrastructure/database/database.module"
import { UsersModule } from "./modules/users/users.module"
import { ObservabilityModule } from "./observability/observability.module"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.${process.env.NODE_ENV}.local`,
				`.env.${process.env.NODE_ENV}`,
				`.env`
			],
			load: [databaseEnv, environemtEnv, grpcEnv, jaegerEnv]
		}),
		DatabaseModule,
		ObservabilityModule,
		UsersModule
	]
})
export class AppModule {}
