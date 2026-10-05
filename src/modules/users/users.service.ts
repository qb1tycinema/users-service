import { Injectable } from "@nestjs/common"
import { RpcException } from "@nestjs/microservices"
import { RpcStatus } from "@qb1tycinema/common"
import type {
	CreateUserRequest,
	GetMeRequest,
	PatchUserRequest
} from "@qb1tycinema/contracts/gen/users"
import { PinoLogger } from "nestjs-pino"
import { lastValueFrom } from "rxjs"

import { UsersRepository } from "./users.repository"
import { AccountClientGrpc } from "@/infrastructure/grpc/clients/account.client"

@Injectable()
export class UsersService {
	public constructor(
		private readonly logger: PinoLogger,
		private readonly usersRepository: UsersRepository,
		private readonly accountClient: AccountClientGrpc
	) {
		this.logger.setContext(UsersService.name)
	}

	public async getMe(data: GetMeRequest) {
		const { id } = data

		this.logger.info({ userId: id }, "Fetching user profile")

		const profile = await this.usersRepository.findById(id)

		if (!profile) {
			this.logger.warn({ userId: id }, "Profile not found in database")

			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: "Profile not found"
			})
		}

		this.logger.debug(
			{ userId: id },
			"Fetching account credentials from account-service"
		)

		const account = await lastValueFrom(
			this.accountClient.getAccount({ id: id })
		)

		this.logger.info(
			{ userId: id },
			"Successfully aggregated user profile and account data"
		)

		return {
			user: {
				id: profile.id,
				name: profile.name ?? undefined,
				avatar: profile.avatar ?? undefined,
				email: account.email,
				phone: account.phone
			}
		}
	}

	public async create(data: CreateUserRequest) {
		const { id } = data

		this.logger.info({ userId: id }, "Initiating user profile creation")

		await this.usersRepository.create({ id: id })

		this.logger.info({ userId: id }, "User profile created successfully")

		return { ok: true }
	}

	public async update(data: PatchUserRequest) {
		const { userId: id, name } = data

		this.logger.info(
			{ userId: id, updatedFields: { name } },
			"Initiating user profile update"
		)

		const user = await this.usersRepository.findById(id)

		if (!user) {
			this.logger.warn(
				{ userId: id },
				"Update failed: User profile not found in database"
			)

			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: "User not found"
			})
		}

		await this.usersRepository.update(user.id, {
			...(name !== undefined && { name })
		})

		this.logger.info({ userId: id }, "User profile updated successfully")

		return { ok: true }
	}
}
