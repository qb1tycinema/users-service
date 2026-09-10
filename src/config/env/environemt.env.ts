import { registerAs } from "@nestjs/config"

import type { EnvironemtConfig } from "../interfaces/environemt.interface"
import { EnvironemtValidator } from "../validators"

import { validateEnv } from "@/shared/utils"

export const environemtEnv = registerAs<EnvironemtConfig>("environemt", () => {
	const validated = validateEnv(process.env, EnvironemtValidator)

	return {
		environemt: validated.NODE_ENV
	}
})
