import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const student = new Student();
    student.name = createStudentDto.name;
    student.email = createStudentDto.email;
    student.phone = createStudentDto.phone;
    student.volId = createStudentDto.volId;
    student.cohortId = createStudentDto.cohortId;
    return await this.studentRepository.save(student);
  }
  async findAll() {
    return this.studentRepository.find();
  }
  async findOne(id: number) {
    return await this.studentRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  async findByVolId(volId: number, cohortId: number) {
    return await this.studentRepository.find({
      where: {
        volId: volId,
        cohortId: cohortId,
      },
    });
  }
  async findByEmail(email: string) {
    return await this.studentRepository.findOne({
      where: {
        email: email,
      },
    });
  }
  async findByChort(id: number) {
    return await this.studentRepository.find({
      where: {
        cohortId: id,
      },
    });
  }
}
