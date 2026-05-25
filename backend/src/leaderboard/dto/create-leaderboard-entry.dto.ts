import { IsInt, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateLeaderboardEntryDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsInt()
  @Min(0)
  score!: number;
}
