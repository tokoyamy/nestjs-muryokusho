import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users = [
    {
      id: 'db2f8780-cee2-11ee-ab85-456328b4c9eb',
      name: 'Mathew',
      email: 'matthew@gmail.com',
      password: '$2b$10$Q.Z37/8VMCI9OfQZ9PdyMuMPp7lWnNli4yZ09M5cvbiAr0F8EkiXm',
    },
    {
      id: 'f3931ee0-cee2-11ee-8f17-599eb0aa5890',
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: '$2b$10$L9Lz/f9C7ug0FJJls8kP5Oeq4kZSf.SjVbcZvcvVDYg0vzL1DJMSi',
    },
  ];

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = {
      id: uuidv1(),
      ...createUserDto,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new NotFoundException('User not found');
    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    return this.users[userIndex];
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new NotFoundException('User not found');
    const removedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return removedUser;
  }
}
