import { StudentsService } from './students.service';
import { Controller, Param } from '@nestjs/common';
import { Post, Get, Body } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { GetStudentsDto } from './dto/GetStudents.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { RolesGuard } from 'src/utils/guards/roles.guard';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @Roles(Role.Poc, Role.Admin)
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    try {
      if (await this.studentService.findByEmail(createStudentDto.email)) {
        return { meassage: 'Student Already Exist' };
      }
      return await this.studentService.create(createStudentDto);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get')
  @Roles(Role.Admin)
  async findAll() {
    return await this.studentService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @Roles(Role.Admin, Role.Poc)
  async findOne(@Param('id') id: string) {
    return await this.studentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('getAll')
  @Roles(Role.Admin || Role.Poc)
  async findById(@Body() getStudentsDto: GetStudentsDto) {
    return await this.studentService.findByVolId(
      getStudentsDto.volId,
      getStudentsDto.cohortId,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Poc)
  @Get('getbyCohort/:id')
  async findByCohort(@Param('id') id: number) {
    return await this.studentService.findByChort(id);
  }
}
