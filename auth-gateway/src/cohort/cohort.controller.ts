import { Body, Controller, Post } from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CreateCohortDto } from './dto/create-cohort.dto';

@Controller('cohort')
export class CohortController {
  constructor(private readonly cohortService: CohortService) {}

  @Post('create')
  async create(@Body() createCohortDto: CreateCohortDto) {
    await this.cohortService.create(createCohortDto);
  }
}
