import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '8h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export default class AuthModule {}
