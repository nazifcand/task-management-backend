import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTagValidation {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  textColor: string;

  @IsNumber()
  projectId: number;
}

export class UpdateTagValidation {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  textColor: string;

  @IsOptional()
  @IsNumber()
  projectId: number;
}
