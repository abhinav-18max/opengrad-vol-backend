import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';

@Controller('cohort')
export class CohortController {
  constructor(private readonly cohortService: CohortService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @Roles(Role.Admin)
  async create(@Body() createCohortDto: CreateCohortDto) {
    if (await this.cohortService.findByName(createCohortDto.name)) {
      return { message: 'Cohort already exists' };
    }
    return await this.cohortService.create(createCohortDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  @Roles(Role.Admin)
  async getAll() {
    return await this.cohortService.getAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('poc/:id')
  @Roles(Role.Admin, Role.Poc)
  async findByPoc(@Param('id') id: number) {
    return await this.cohortService.findByPoc(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Vol)
  @Get('vol/:id')
  async findByVol(@Param('id') id: number) {
    return await this.cohortService.findByVol(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('volByCohort/:id')
  @Roles(Role.Admin, Role.Poc)
  async findVolByCohort(@Param('id') id: number) {
    return await this.cohortService.getvolsInCohort(id);
  }
}
