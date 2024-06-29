import { Module } from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CohortController } from './cohort.controller';
import { Cohort } from './entities/cohort.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cohort])],
  providers: [CohortService],
  controllers: [CohortController],
})
export class CohortModule {}
