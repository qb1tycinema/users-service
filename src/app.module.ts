import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { databaseEnv, environemtEnv, grpcEnv } from "./config/env"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseEnv, environemtEnv, grpcEnv]
		})
	]
})
export class AppModule {}
