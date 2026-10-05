import {
	type CallHandler,
	type ExecutionContext,
	Injectable,
	type NestInterceptor
} from "@nestjs/common"
import { InjectMetric } from "@willsoto/nestjs-prometheus"
import { PinoLogger } from "nestjs-pino"
import { Counter, Histogram } from "prom-client"
import { type Observable, tap } from "rxjs"

@Injectable()
export class GrpcMetricsInterceptor implements NestInterceptor {
	private readonly serviceName!: string

	public constructor(
		private readonly logger: PinoLogger,
		@InjectMetric("grpc_requests_total")
		private readonly counter: Counter<string>,
		@InjectMetric("grpc_request_duration_seconds")
		private readonly historgram: Histogram<string>
	) {
		this.serviceName = "users-service"
	}

	public intercept(
		context: ExecutionContext,
		next: CallHandler<any>
	): Observable<any> {
		if (context.getType() !== "rpc") {
			return next.handle()
		}

		const handler = context.getHandler().name
		const rpcCtx = context.switchToRpc()

		const data = rpcCtx.getData()

		const metadata = rpcCtx.getContext()
		const metaMap =
			metadata && typeof metadata.getMap === "function"
				? metadata.getMap()
				: metadata

		this.logger.info(
			{ method: handler },
			"Received gRPC request in users-service"
		)

		this.logger.debug(
			{ method: handler, payload: data, metadata: metaMap },
			"gRPC request details"
		)

		const endTimer = this.historgram.startTimer({
			service: this.serviceName,
			method: handler
		})

		return next.handle().pipe(
			tap({
				next: () => {
					this.logger.debug(
						{ method: handler },
						"gRPC request processed successfully"
					)

					this.counter.inc({
						service: this.serviceName,
						method: handler,
						status: "OK"
					})

					endTimer()
				},
				error: error => {
					this.logger.error(
						{ method: handler, err: error },
						"Error processing gRPC request"
					)

					this.counter.inc({
						service: this.serviceName,
						method: handler,
						status: "ERROR"
					})

					endTimer()
				}
			})
		)
	}
}
