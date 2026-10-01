import { Module } from "@nestjs/common"

import { MetricsModule } from "./metrics/metrics.module"
import { JaegerValidator } from "@/config/validators"

@Module({
	imports: [MetricsModule, JaegerValidator]
})
export class ObservabilityModule {}
