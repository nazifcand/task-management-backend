import { IsOptional, IsString } from 'class-validator';

export class CreateOrganizationValidation {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class UpdateOrganizationValidation {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
