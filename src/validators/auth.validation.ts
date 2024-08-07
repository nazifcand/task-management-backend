import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterValidation {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  avatar: string;
}

export class LoginValidation {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
