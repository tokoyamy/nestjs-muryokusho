import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

export type User = any;

@Injectable()
export class UserService {
  private users = [
    {
      id: 'db2f8780-cee2-11ee-ab85-456328b4c9eb',
      name: 'Mathew',
      email: 'matthew@gmail.com',
      password: 'toor',
    },
  ];

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = {
        id: uuidv1(),
        ...createUserDto,
        password: createUserDto.password,
      };
      this.users.push(newUser);
      return newUser;
    } catch (error) {
      throw new BadRequestException(
        'Error creating user. Check the data provided.',
      );
    }
  }

  findAll() {
    return this.users;
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    try {
      this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
      return this.users[userIndex];
    } catch (error) {
      throw new BadRequestException(
        'Error updating user. Check the data provided.',
      );
    }
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found.');
    }
    const removedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return removedUser;
  }
}
