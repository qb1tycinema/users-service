import { IsInt, IsNotEmpty, IsString, Matches } from "class-validator"

export class GrpcValidator {
	@IsString()
	@IsNotEmpty()
	public GRPC_HOST!: string

	@IsInt()
	public GRPC_PORT!: number

	@IsString()
	@IsNotEmpty()
	@Matches(/^.+:\d{1,5}$/, {
		message:
			"ACCOUNT_GRPC_URL must be in the format 'host:port' (e.g., localhost:50051)"
	})
	public ACCOUNT_GRPC_URL!: string
}
