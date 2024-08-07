import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginValidation,
  RegisterValidation,
} from 'src/validators/auth.validation';
import { User } from 'src/models/User.model';
import textToHash from 'src/utils/textToHash';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Controller()
export default class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@Req() req): Promise<User> {
    return req.user;
  }

  @Post('/login')
  async login(@Body() body: LoginValidation): Promise<{ token: string }> {
    body['password'] = textToHash(body.password);

    const { email, password } = body;

    // find user
    const [error, user] = await this.authService.login({ email, password });

    if (error) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // not found user
    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const token = await this.jwtService.signAsync({
      userId: user.id,
      email: user.email,
    });

    return { token };
  }

  @Post('/register')
  async register(@Body() body: RegisterValidation): Promise<User> {
    body['password'] = textToHash(body.password);

    // create user
    const [error, createdUser] = await this.authService.createUser(body);

    if (error) {
      throw new HttpException(error.name, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return createdUser;
  }
}
