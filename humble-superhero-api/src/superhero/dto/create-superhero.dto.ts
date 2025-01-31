import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  superpower: string;

  @IsNumber()
  @Min(1, { message: 'Humility score must be at least 1.' })
  @Max(10, { message: 'Humility score cannot exceed 10.' })
  humilityScore: number;
}
