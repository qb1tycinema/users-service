import { Controller } from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"
import type {
	CreateUserRequest,
	CreateUserResponse,
	GetMeRequest,
	GetMeResponse
} from "@qb1tycinema/contracts/gen/users"

import { UsersService } from "./users.service"

@Controller()
export class UsersController {
	public constructor(private readonly usersService: UsersService) {}

	@GrpcMethod("UsersService", "GetMe")
	public async getMe(data: GetMeRequest): Promise<GetMeResponse> {
		return await this.usersService.getMe(data)
	}

	@GrpcMethod("UsersService", "CreateUser")
	public async create(data: CreateUserRequest): Promise<CreateUserResponse> {
		return await this.usersService.create(data)
	}
}
