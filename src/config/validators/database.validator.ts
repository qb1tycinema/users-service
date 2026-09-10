import { Transform } from "class-transformer"
import { IsBoolean, IsInt, IsString, Max, Min } from "class-validator"

export class DatabaseValidator {
	@IsString()
	public DATABASE_USER!: string

	@IsString()
	public DATABASE_PASS!: string

	@IsString()
	public DATABASE_HOST!: string

	@IsInt()
	@Min(1)
	@Max(65535)
	public DATABASE_PORT!: number

	@IsString()
	public DATABASE_NAME!: string

	@Transform(({ value }) => value === "true")
	@IsBoolean()
	public DATABASE_LOGGING!: boolean

	@Transform(({ value, obj }) => {
		if (value !== undefined) {
			return value === "true"
		}

		return obj.NODE_ENV === "development"
	})
	@IsBoolean()
	public DATABASE_SYNC!: boolean
}
