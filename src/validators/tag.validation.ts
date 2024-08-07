import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTagValidation {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  tag: string;

  @IsNumber()
  projectId: string;
}

export class UpdateTagValidation {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  tag: string;

  @IsOptional()
  @IsNumber()
  projectId: string;
}
