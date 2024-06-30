import { StudentsService } from './students.service';
import { Controller, Param } from '@nestjs/common';
import { Post, Get, Body } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { GetStudentsDto } from './dto/GetStudents.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}
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
  @Get('get')
  async findAll() {
    return await this.studentService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.studentService.findOne(+id);
  }
  @Post('getAll')
  async findById(@Body() getStudentsDto: GetStudentsDto) {
    return await this.studentService.findByVolId(
      getStudentsDto.volId,
      getStudentsDto.cohortId,
    );
  }
}
