import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users = [
    {
      id: 'db2f8780-cee2-11ee-ab85-456328b4c9eb',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    },
    {
      id: 'f3931ee0-cee2-11ee-8f17-599eb0aa5890',
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456',
    },
  ];

  create(createUserDto: CreateUserDto) {
    const newUser = { id: uuidv1(), ...createUserDto };
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
