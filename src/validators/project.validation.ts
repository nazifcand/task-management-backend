import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectValidation {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  organizationId: string;
}

export class UpdateProjectValidation {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  organizationId: string;
}
