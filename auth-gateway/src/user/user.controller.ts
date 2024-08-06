import { EditDto } from './dto/Edit.dto';
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
  Put,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InvitePocDto } from './dto/invite-poc.dto';
import { InviteVolDto } from './dto/invite-vol.dto';
import { MagicloginStrategy } from '../auth/passport/magiclogin.strategy';
import { AssignVolDto } from './dto/assign-vol.dto';
import { Roles } from 'src/utils/decorators/Roles.decorator';
import { Role } from 'src/utils/roles.enum';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { RolesGuard } from 'src/utils/guards/roles.guard';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('email/:email') findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('pocinvite')
  @Roles(Role.Admin)
  createpocinvite(@Body() invitepocDto: InvitePocDto) {
    return this.userService.createPocInvite(invitepocDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('volinvite')
  @Roles(Role.Admin, Role.Poc)
  createvolinvite(@Body() invitevolDto: InviteVolDto) {
    return this.userService.createVolInvite(invitevolDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get/pocinvites')
  @Roles(Role.Admin)
  getpocinvites() {
    return this.userService.getPocInvites();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get/volinvites/:pocId')
  @Roles(Role.Admin, Role.Poc)
  getvolinvites(@Param('pocId') pocId: number) {
    return this.userService.getVolInvites(pocId);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get/pocvolinvites')
  @Roles(Role.Admin, Role.Poc)
  getPocVolInvites(@Req() req: Request) {
    return this.userService.getPocVolInvites(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('assignvol')
  @Roles(Role.Admin, Role.Poc)
  assignVol(@Body() assignVolDto: AssignVolDto) {
    return this.userService.assignVoltoCohort(assignVolDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get/poc')
  @Roles(Role.Admin)
  getAllPoc() {
    return this.userService.getAllPoc();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('volbyPoc/:id')
  @Roles(Role.Admin, Role.Poc)
  getVolByPoc(@Param('id') id: number) {
    return this.userService.getVolbyPoc(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('volById/:id')
  @Roles(Role.Admin, Role.Poc)
  getVolfulldata(@Param('id') id: number) {
    return this.userService.getVolData(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('pocById/:id')
  @Roles(Role.Admin, Role.Poc, Role.Vol)
  getPocData(@Param('id') id: number) {
    return this.userService.getPocData(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('editName')
  editName(@Req() req: Request, @Body() edit: EditDto) {
    return this.userService.editName(req.user, edit);
  }
}
