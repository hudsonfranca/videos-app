import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(params: CreateUserDto): Promise<User> {
    const { email, password, username } = params;

    const userEmail = await this.userRepository.findOne({ email });

    if (userEmail)
      throw new BadRequestException(`O email ${email} já está em uso.`);

    const hash = bcrypt.hashSync(password, 10);

    const userEntity = this.userRepository.create({
      email,
      username,
      password: hash,
    });

    const user = await this.userRepository.save(userEntity);

    return await this.findUserById(user.id);
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne(id, {
      select: ['id', 'email', 'username'],
    });
  }

  async findUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'email', 'username'],
    });
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }
}
