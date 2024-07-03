import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CreateCohortDto } from './dto/create-cohort.dto';

@Controller('cohort')
export class CohortController {
  constructor(private readonly cohortService: CohortService) {}

  @Post('create')
  async create(@Body() createCohortDto: CreateCohortDto) {
    if (await this.cohortService.findByName(createCohortDto.name)) {
      return { message: 'Cohort already exists' };
    }
    return await this.cohortService.create(createCohortDto);
  }
  @Get('all')
  async getAll() {
    return await this.cohortService.getAll();
  }
  @Get('poc/:id')
  async findByPoc(@Param('id') id: number) {
    return await this.cohortService.findByPoc(id);
  }
  @Get('vol/:id')
  async findByVol(@Param('id') id: number) {
    return await this.cohortService.findByVol(id);
  }

  @Get('volBycohort/:id')
  async findVolByCohort(@Param('id') id: number) {
    return await this.cohortService.getvolBycohort(id);
  }
}
