import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { AuthenticatedGuard } from 'src/utils/guards/Authenticated.guard';

@Controller('cohort')
export class CohortController {
  constructor(private readonly cohortService: CohortService) {}
  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  async create(@Body() createCohortDto: CreateCohortDto) {
    if (await this.cohortService.findByName(createCohortDto.name)) {
      return { message: 'Cohort already exists' };
    }
    return await this.cohortService.create(createCohortDto);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard)
  @Get('all')
  async getAll() {
    return await this.cohortService.getAll();
  }

  @Roles(Role.Admin, Role.Poc)
  @UseGuards(AuthenticatedGuard)
  @Get('poc/:id')
  async findByPoc(@Param('id') id: number) {
    return await this.cohortService.findByPoc(id);
  }
  @Roles(Role.Vol)
  @UseGuards(AuthenticatedGuard)
  @Get('vol/:id')
  async findByVol(@Param('id') id: number) {
    return await this.cohortService.findByVol(id);
  }

  @Roles(Role.Admin, Role.Poc)
  @UseGuards(AuthenticatedGuard)
  @Get('volByCohort/:id')
  async findVolByCohort(@Param('id') id: number) {
    return await this.cohortService.getvolsInCohort(id);
  }
}
