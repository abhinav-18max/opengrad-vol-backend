import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InvitePocDto } from './dto/invite-poc.dto';
import { InviteVolDto } from './dto/invite-vol.dto';
import { MagicloginStrategy } from '../auth/passport/magiclogin.strategy';
import { AssignVolDto } from './dto/assign-vol.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => MagicloginStrategy))
    private strategy: MagicloginStrategy,
  ) {}

  @Post('register') // @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    if (await this.userService.findOneByEmail(createUserDto.email)) {
      return res.status(230).json({ message: 'Email already exists' });
    } else {
      await this.userService.create(createUserDto);
      return res.status(200).json({ message: 'User created' });
    }
  }

  @Get() findAll() {
    return this.userService.findAll();
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('email/:email') findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('pocinvite')
  createpocinvite(@Body() invitepocDto: InvitePocDto) {
    return this.userService.createPocInvite(invitepocDto);
  }
  @Post('volinvite')
  createvolinvite(@Body() invitevolDto: InviteVolDto) {
    return this.userService.createVolInvite(invitevolDto);
  }

  @Post('assignvol')
  assignVol(@Body() assignVolDto: AssignVolDto) {
    return this.userService.assignVoltoCohort(assignVolDto);
  }
}
