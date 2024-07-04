import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InvitePocDto } from './dto/invite-poc.dto';
import { InviteVolDto } from './dto/invite-vol.dto';
import { MagicloginStrategy } from '../auth/passport/magiclogin.strategy';
import { AssignVolDto } from './dto/assign-vol.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { AuthenticatedGuard } from 'src/utils/guards/Authenticated.guard';

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

  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard)
  @Post('pocinvite')
  createpocinvite(@Body() invitepocDto: InvitePocDto) {
    return this.userService.createPocInvite(invitepocDto);
  }
  @Post('volinvite')
  createvolinvite(@Body() invitevolDto: InviteVolDto) {
    return this.userService.createVolInvite(invitevolDto);
  }

  @Roles(Role.Admin, Role.Poc)
  @UseGuards(AuthenticatedGuard)
  @Post('assignvol')
  assignVol(@Body() assignVolDto: AssignVolDto) {
    return this.userService.assignVoltoCohort(assignVolDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard)
  @Get('get/poc')
  getAllPoc() {
    return this.userService.getAllPoc();
  }

  @Roles(Role.Admin, Role.Poc)
  @UseGuards(AuthenticatedGuard)
  @Get('volbyPoc/:id')
  getVolByPoc(@Param('id') id: number) {
    return this.userService.getVolbyPoc(id);
  }

  @Roles(Role.Admin, Role.Poc)
  @UseGuards(AuthenticatedGuard)
  @Get('volById/:id')
  getVolfulldata(@Param('id') id: number) {
    return this.userService.getVolData(id);
  }
}
