import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
import * as bcrypt from 'bcrypt';
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
    {
      id: 'f3931ee0-cee2-11ee-8f17-599eb0aa5890',
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: '$2b$10$L9Lz/f9C7ug0FJJls8kP5Oeq4kZSf.SjVbcZvcvVDYg0vzL1DJMSi',
    },
  ];

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = {
        id: uuidv1(),
        ...createUserDto,
        password: hashedPassword,
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
