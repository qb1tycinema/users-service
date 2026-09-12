import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PROTO_PATHS } from "@qb1tycinema/contracts"

import { UserEntity } from "./entities/user.entity"
import { UsersController } from "./users.controller"
import { UsersRepository } from "./users.repository"
import { UsersService } from "./users.service"
import type { AllConfigs } from "@/config/interfaces"
import { AccountClientGrpc } from "@/infrastructure/grpc/clients/account.client"

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		ClientsModule.registerAsync([
			{
				name: "ACCOUNT_PACKAGE",
				useFactory: (config: ConfigService<AllConfigs>) => ({
					transport: Transport.GRPC,
					options: {
						package: "account.v1",
						protoPath: PROTO_PATHS.ACCOUNT,
						url: config.get("grpc.accountUrl", { infer: true })
					}
				}),
				inject: [ConfigService]
			}
		])
	],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, AccountClientGrpc]
})
export class UsersModule {}
