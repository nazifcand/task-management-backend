import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStatusValidation {
  @IsString()
  title: string;

  @IsString()
  color: string;

  @IsOptional()
  @IsNumber()
  priority: string;

  @IsOptional()
  @IsBoolean()
  default: boolean;

  @IsNumber()
  projectId: string;
}

export class UpdateStatusValidation {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsNumber()
  priority: string;

  @IsOptional()
  @IsBoolean()
  default: boolean;

  @IsOptional()
  @IsNumber()
  projectId: string;
}
