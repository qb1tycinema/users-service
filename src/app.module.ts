import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { grpcEnv } from "./config/env"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [grpcEnv]
		})
	]
})
export class AppModule {}
