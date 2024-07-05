import { Global, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { MagicloginStrategy } from './passport/magiclogin.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './passport/jwt.strategy';

@Global()
@Module({
  imports: [UserModule],
  providers: [AuthService, JwtStrategy, LocalStrategy, MagicloginStrategy],
  controllers: [AuthController],
  exports: [MagicloginStrategy, LocalStrategy, AuthService],
})
export class AuthModule {}
