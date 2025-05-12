import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
