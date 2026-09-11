import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { databaseEnv, environemtEnv, grpcEnv } from "./config/env"
import { DatabaseModule } from "./infrastructure/database/database.module"
import { UsersModule } from "./modules/users/users.module"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseEnv, environemtEnv, grpcEnv]
		}),
		DatabaseModule,
		UsersModule
	]
})
export class AppModule {}
