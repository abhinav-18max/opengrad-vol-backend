import { Module } from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CohortController } from './cohort.controller';
import { Cohort } from './entities/cohort.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PocRelation } from 'src/user/entities/poc.entity';
import { VolRelation } from 'src/user/entities/vol.entity';
import { LocalStrategy } from 'src/auth/passport/local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Cohort, PocRelation, VolRelation])],
  providers: [CohortService],
  controllers: [CohortController],
})
export class CohortModule {}
