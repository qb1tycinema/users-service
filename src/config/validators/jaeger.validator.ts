import { IsUrl } from "class-validator"

export class JaegerValidator {
	@IsUrl({
		protocols: ["http"],
		require_tld: true
	})
	public JAEGER_URL!: string
}
