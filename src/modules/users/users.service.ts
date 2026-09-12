import { Injectable } from "@nestjs/common"
import type { CreateUserRequest, GetMeRequest } from "@qb1tycinema/contracts/gen/users"

import { UsersRepository } from "./users.repository"
import { AccountClientGrpc } from "@/infrastructure/grpc/clients/account.client"
import { RpcException } from "@nestjs/microservices"
import { RpcStatus } from "@qb1tycinema/common"
import { lastValueFrom } from "rxjs"

@Injectable()
export class UsersService {
	public constructor(
		private readonly usersRepository: UsersRepository,
		private readonly accountClient: AccountClientGrpc
	) {}

	public async getMe(data: GetMeRequest) {
		const { id } = data

		const profile = await this.usersRepository.findById(id)

		if (!profile) {
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: "Profile not found"
			})
		}

		const account = await lastValueFrom(
			this.accountClient.getAccount({ id: id })
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

		await this.usersRepository.create({ id: id })

		return { ok: true }
	}
}
