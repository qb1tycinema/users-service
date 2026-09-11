import { Injectable } from "@nestjs/common"
import type { CreateUserRequest } from "@qb1tycinema/contracts/gen/users"

import { UsersRepository } from "./users.repository"

@Injectable()
export class UsersService {
	public constructor(private readonly usersRepository: UsersRepository) {}

	public async create(data: CreateUserRequest) {
		await this.usersRepository.create({ id: data.id })

		return { ok: true }
	}
}
