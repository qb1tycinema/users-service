import type { DatabaseConfig } from "./database.interface"
import type { EnvironemtConfig } from "./environemt.interface"
import type { GrpcConfig } from "./grpc.interface"

export interface AllConfigs {
	database: DatabaseConfig
	environemt: EnvironemtConfig
	grpc: GrpcConfig
}
