import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cohort } from './entities/cohort.entity';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { PocRelation } from '../user/entities/poc.entity';

@Injectable()
export class CohortService {
  constructor(
    @InjectRepository(Cohort) private cohortRepository: Repository<Cohort>,
    @InjectRepository(PocRelation) private pocRelation: Repository<PocRelation>,
  ) {}

  async create(createCohortDto: CreateCohortDto): Promise<Cohort> {
    try {
      const cohort = new Cohort();
      cohort.name = createCohortDto.name;
      cohort.startDate = createCohortDto.startDate;
      cohort.endDate = createCohortDto.endDate;

      const pocs: PocRelation[] = [];
      createCohortDto.poc.map(async (p) => {
        pocs.push(
          await this.pocRelation.findOne({
            where: { id: p },
          }),
        );
      });
      cohort.poc = pocs;

      return await this.cohortRepository.save(cohort);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
