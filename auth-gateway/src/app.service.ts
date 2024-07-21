import { User } from './user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Role } from './auth/roles.enum';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    try {
      const isAdmin = await this.userRepository.findOneBy({ role: Role.Admin });
      if (isAdmin) {
        const gensaalt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(
          process.env.ADMIN_PASSWORD,
          gensaalt,
        );
        isAdmin.password = hashpass;
        isAdmin.email = 'admin@opengrad.in';
        return await this.userRepository.save(isAdmin);
      }
      const user = new User();
      user.name = 'admin';
      user.email = 'admin@opengrad.in';
      user.role = Role.Admin;
      const gensaalt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(process.env.ADMIN_PASSWORD, gensaalt);
      user.password = hashpass;
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error', error);
    }
  }
}
