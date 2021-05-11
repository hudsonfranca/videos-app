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

  async createUser(
    params: CreateUserDto,
    profilePicture: Express.Multer.File,
  ): Promise<User> {
    const { email, password, username } = params;

    const hostUrl = 'http://localhost:4000/uploads/';

    const userEmail = await this.userRepository.findOne({ email });

    if (userEmail)
      throw new BadRequestException(`O email ${email} já está em uso.`);

    const hash = bcrypt.hashSync(password, 10);

    const userEntity = this.userRepository.create({
      email,
      username,
      password: hash,
      profilePicture: `${hostUrl}${profilePicture.filename}`,
    });

    const user = await this.userRepository.save(userEntity);

    return await this.findUserById(user.id);
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne(id, {
      select: ['id', 'email', 'username', 'profilePicture'],
    });
  }

  async findUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'email', 'username', 'profilePicture'],
    });
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }
}
