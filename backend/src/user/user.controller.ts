import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);
    return user;
  }

  @Get()
  async findUsers() {
    const user = await this.userService.findUsers();
    return user;
  }
}
