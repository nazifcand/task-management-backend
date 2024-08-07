import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskValidation {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  projectId: string;

  @IsNumber()
  statusId: string;

  @IsNumber({}, { each: true })
  users: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  tags: number[];

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;
}

export class UpdateTaskValidation {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  projectId: string;

  @IsOptional()
  @IsNumber()
  statusId: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  users: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  tags: number[];

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;
}
