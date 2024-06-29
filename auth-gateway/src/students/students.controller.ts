import { StudentsService } from './students.service';
import { Controller, Param } from '@nestjs/common';
import { Post, Get, Body } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}
  @Post('')
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }
  @Get('')
  findAll() {
    return this.studentService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }
  @Get('get/:volId/:cohortId')
  findById(@Param('volId') volId: string, @Param('cohortId') cohortId: string) {
    return this.studentService.findByVolId(+volId, +cohortId);
  }
}
