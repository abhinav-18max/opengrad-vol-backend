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
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
