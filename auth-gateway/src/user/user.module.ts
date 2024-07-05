import { forwardRef, Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { InvitePoc } from './entities/invite-poc.entity';
import { InviteVol } from './entities/invite-vol.entity';
import { PocRelation } from './entities/poc.entity';
import { VolRelation } from './entities/vol.entity';
import { AuthModule } from '../auth/auth.module';
import { Cohort } from '../cohort/entities/cohort.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/roles.guard';
import { LocalStrategy } from 'src/auth/passport/local.strategy';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      InvitePoc,
      InviteVol,
      PocRelation,
      VolRelation,
      Cohort,
    ]),
  ],
  controllers: [UserController],
  providers: [
    JwtService,
    UserService,
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
