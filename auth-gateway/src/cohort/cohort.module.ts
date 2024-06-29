import { Module } from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CohortController } from './cohort.controller';
import { Cohort } from './entities/cohort.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PocRelation } from 'src/user/entities/poc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cohort, PocRelation])],
  providers: [CohortService],
  controllers: [CohortController],
})
export class CohortModule {}
