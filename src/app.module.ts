import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { LoggerModule } from "nestjs-pino"

import {
	databaseEnv,
	environemtEnv,
	grpcEnv,
	jaegerEnv,
	loggerEnv
} from "./config/env"
import { getPinoConfig } from "./config/loaders"
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
			load: [databaseEnv, environemtEnv, grpcEnv, jaegerEnv, loggerEnv]
		}),
		LoggerModule.forRootAsync({
			useFactory: getPinoConfig,
			inject: [ConfigService]
		}),
		DatabaseModule,
		ObservabilityModule,
		UsersModule
	]
})
export class AppModule {}
