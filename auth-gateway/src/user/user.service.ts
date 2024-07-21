import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InvitePocDto } from './dto/invite-poc.dto';
import { InviteVolDto } from './dto/invite-vol.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InvitePoc } from './entities/invite-poc.entity';
import { InviteVol } from './entities/invite-vol.entity';
import { Role } from '../auth/roles.enum';
import { PasswordSetDto } from './dto/passwordset.dto';
import { PocRelation } from './entities/poc.entity';
import { VolRelation } from './entities/vol.entity';
import { Cohort } from '../cohort/entities/cohort.entity';
import { AssignVolDto } from './dto/assign-vol.dto';
import { EditDto } from './dto/Edit.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(InvitePoc)
    private invitePocRepository: Repository<InvitePoc>,
    @InjectRepository(InviteVol)
    private inviteVolRepository: Repository<InviteVol>,
    @InjectRepository(PocRelation)
    private pocRepository: Repository<PocRelation>,
    @InjectRepository(VolRelation)
    private volRepository: Repository<VolRelation>,
    @InjectRepository(Cohort)
    private cohortRepository: Repository<Cohort>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      if (
        !createUserDto.name ||
        !createUserDto.email ||
        !createUserDto.password
      ) {
        return 'Please fill all fields';
      }
      if (createUserDto.password.length < 6) {
        return 'Password must be at least 6 characters';
      }
      const gensaalt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(createUserDto.password, gensaalt);

      const user: User = new User();
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.password = hashpass;
      user.role = createUserDto.role;
      return this.userRepository.save(user);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      select: ['email', 'password', 'name'],
      where: { id: id },
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      select: ['id', 'email', 'password', 'name', 'role'],
      where: { email: email },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createPocInvite(InvitePocDto: InvitePocDto) {
    try {
      const res1 = await this.userRepository.findOne({
        where: { email: InvitePocDto.email },
      });
      const res2 = await this.invitePocRepository.findOne({
        where: { email: InvitePocDto.email },
      });
      const res3 = await this.inviteVolRepository.findOne({
        where: { email: InvitePocDto.email },
      });
      if (res1 || res2 || res3) {
        return 'Email already exists';
      } else {
        const invitePoc: InvitePoc = new InvitePoc();
        invitePoc.email = InvitePocDto.email;
        invitePoc.role = Role.Poc;
        invitePoc.name = InvitePocDto.name;
        return await this.invitePocRepository.save(invitePoc);
      }
    } catch (err) {
      return err.message;
    }
  }

  async createVolInvite(InviteVolDto: InviteVolDto) {
    try {
      const res1 = await this.userRepository.findOne({
        where: { email: InviteVolDto.email },
      });
      const res2 = await this.invitePocRepository.findOne({
        where: { email: InviteVolDto.email },
      });
      const res3 = await this.inviteVolRepository.findOne({
        where: { email: InviteVolDto.email },
      });
      if (res1 || res2 || res3) {
        return 'Email already exists';
      } else {
        const inviteVol: InviteVol = new InviteVol();
        inviteVol.email = InviteVolDto.email;
        inviteVol.role = Role.Vol;
        inviteVol.name = InviteVolDto.name;
        inviteVol.Poc = InviteVolDto.Poc;
        return this.inviteVolRepository.save(inviteVol);
      }
    } catch (err) {
      return err.message;
    }
  }
  async checkEmail(email: string) {
    const res1 = await this.userRepository.findOne({
      select: ['email'],
      where: { email: email },
    });
    if (res1) {
      const response = {
        email: res1.email,
        spec: 'user',
      };
      return response;
    }
    const res2 = await this.inviteVolRepository.findOne({
      select: ['email'],
      where: { email: email },
    });
    if (res2) {
      const response = {
        email: res2.email,
        spec: 'invite-vol',
      };
      return response;
    }
    const res3 = await this.invitePocRepository.findOne({
      select: ['email'],
      where: { email: email },
    });
    if (res3) {
      const response = {
        email: res3.email,
        spec: 'invite-poc',
      };
      return response;
    }
    return null;
  }

  async createUserPoc(email: string, password: PasswordSetDto) {
    const det = await this.invitePocRepository.findOne({
      where: { email: email },
    });
    const user = new User();
    user.email = email;
    const gensaalt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password.password, gensaalt);
    user.password = hashpass;
    user.role = Role.Poc;
    user.name = det.name;

    const res1 = await this.userRepository.save(user);
    det.closed = new Date();
    await this.invitePocRepository.save(det);
    const pocrelation = new PocRelation();
    pocrelation.user_id = res1;
    await this.pocRepository.save(pocrelation);
    return res1;
  }
  async createUserVol(email: string, password: PasswordSetDto) {
    const det = await this.inviteVolRepository.findOne({
      where: { email: email },
    });
    const user = new User();
    user.email = email;
    const gensaalt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password.password, gensaalt);
    user.password = hashpass;
    user.role = Role.Vol;
    user.name = det.name;

    const res1 = await this.userRepository.save(user);
    det.closed = new Date();
    await this.inviteVolRepository.save(det);
    const volRelation = new VolRelation();
    volRelation.user_id = res1;
    const res3 = await this.volRepository.save(volRelation);

    const res2 = await this.pocRepository.findOne({
      where: { id: det.Poc },
      relations: ['vols'],
    });
    res2.vols.push(res3);
    await this.pocRepository.save(res2);
    return res1;
  }
  async assignVoltoCohort(assignVolDto: AssignVolDto) {
    try {
      const res1 = await this.volRepository.findOne({
        where: { id: assignVolDto.volRelationId },
      });
      const vols = [];
      const res2 = await this.cohortRepository.findOne({
        where: { id: assignVolDto.cohortId },
        relations: {
          vol: true,
        },
      });
      vols.push(res1);
      for (let i = 0; i < res2.vol.length; i++) {
        vols.push(res2.vol[i]);
      }
      res2.vol = vols;
      return await this.cohortRepository.save(res2 as any);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getAllPoc() {
    try {
      return await this.pocRepository.find({
        relations: {
          user_id: true,
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async getVolbyPoc(id: number) {
    try {
      return await this.volRepository
        .createQueryBuilder('vol')
        .leftJoinAndSelect('vol.poc', 'poc')
        .leftJoinAndSelect('vol.user_id', 'user')
        .where('poc.id=:id', { id: id })
        .getMany();
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getVolfulldata(user: any) {
    try {
      if (user.role === 'vol') {
        const res = await this.volRepository
          .createQueryBuilder('vol')
          .leftJoinAndSelect('vol.user_id', 'user')
          .leftJoinAndSelect('vol.poc', 'poc')
          .where('user.id=:id', { id: user.id })
          .getOne();

        const res2 = await this.cohortRepository
          .createQueryBuilder('cohort')
          .leftJoinAndSelect('cohort.vol', 'vol')
          .where('vol.id = :id', { id: res.id })
          .getMany();

        const response = {
          Poc: res,
          Cohorts: res2,
        };
        return response;
      } else {
        return user;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async updatePassword(email: string, password: PasswordSetDto) {
    try {
      const res = await this.userRepository.findOne({
        select: ['email', 'password', 'role', 'name', 'id'],
        where: { email: email },
      });

      const gensaalt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(password.password, gensaalt);
      res.password = hashpass;
      return await this.userRepository.save(res);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async getVolData(id: number) {
    try {
      return await this.volRepository.findOne({
        where: { id: id },
        relations: {
          user_id: true,
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getPocData(id: number) {
    try {
      return await this.pocRepository.findOne({
        where: { id: id },
        relations: {
          user_id: true,
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getfulldata(user: any) {
    try {
      if (user.role === 'vol') {
        return await this.volRepository
          .createQueryBuilder('vol')
          .leftJoinAndSelect('vol.user_id', 'user')
          .where('user.id =:id', { id: user.id })
          .getOne();
      }
      if (user.role === 'poc') {
        return await this.pocRepository
          .createQueryBuilder('poc')
          .leftJoinAndSelect('poc.user_id', 'user')
          .where('user.id =:id', { id: user.id })
          .getOne();
      }
      return await this.userRepository.findOne({
        where: { id: user.id },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async editName(user: any, edit: EditDto) {
    try {
      const res = await this.userRepository.findOne({
        where: { id: user.id },
      });
      res.name = edit.name;
      return await this.userRepository.save(res);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
