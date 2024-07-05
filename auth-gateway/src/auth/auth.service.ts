import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private userService: UserService) {}

  async validateUser({ email, password }: LoginDto) {
    const userf = await this.userService.findOneByEmail(email);
    if (userf && (await bcrypt.compare(password, userf.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...restUser } = userf;

      const token = sign({ ...restUser }, process.env.SECRET);
      const user = {
        ...restUser,
        token,
      };
      return user;
    }

    return null;
  }
}
