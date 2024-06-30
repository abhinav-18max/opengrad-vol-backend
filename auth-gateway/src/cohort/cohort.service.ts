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

      const pocs = [];
      for (let i = 0; i < createCohortDto.poc.length; i++) {
        const poc = await this.pocRelation.findOne({
          where: {
            id: createCohortDto.poc[i],
          },
        });
        pocs.push(poc);
        console.log(poc);
      }
      cohort.poc = pocs;

      return await this.cohortRepository.save(cohort);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async findByName(name: string) {
    return await this.cohortRepository.findOne({
      select: ['name'],
      where: { name: name },
    });
  }
}
