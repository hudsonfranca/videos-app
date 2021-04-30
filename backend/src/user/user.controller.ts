import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const user = await this.userService.findUserById(id);

    if (user.id !== req.user.id)
      throw new UnauthorizedException(
        'Você não pode acessar os dados deste usuário.',
      );
    return user;

    // return req.user;
  }

  @Get()
  async findUsers() {
    const user = await this.userService.findUsers();
    return user;
  }
}
