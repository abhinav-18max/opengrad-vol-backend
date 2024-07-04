import { StudentsService } from './students.service';
import { Controller, Param } from '@nestjs/common';
import { Post, Get, Body } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { GetStudentsDto } from './dto/GetStudents.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { AuthenticatedGuard } from 'src/utils/guards/Authenticated.guard';
import { UseGuards } from '@nestjs/common';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}
  @Roles(Role.Poc, Role.Admin)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
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
  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard)
  @Get('get')
  async findAll() {
    return await this.studentService.findAll();
  }

  @Roles(Role.Admin, Role.Poc)
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.studentService.findOne(+id);
  }

  @Roles(Role.Admin || Role.Poc)
  @UseGuards(AuthenticatedGuard)
  @Post('getAll')
  async findById(@Body() getStudentsDto: GetStudentsDto) {
    return await this.studentService.findByVolId(
      getStudentsDto.volId,
      getStudentsDto.cohortId,
    );
  }

  @Roles(Role.Admin, Role.Poc)
  @UseGuards(AuthenticatedGuard)
  @Get('getbyCohort/:id')
  async findByCohort(@Param('id') id: number) {
    return await this.studentService.findByChort(id);
  }
}
