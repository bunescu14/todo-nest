import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/User';
import * as bcrypt from 'bcrypt';
import { HashService } from '../../auth/services/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private hashService: HashService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async deleteUser(id: string): Promise<any> {
    return this.userModel.destroy({ where: { id: id } });
  }
  async create(user): Promise<User> {
    user.password = await this.hashService.hashPassword(user.password);
    return this.userModel.create(user);
  }

  async getUserByUserName(username: string): Promise<User> {
    return await this.userModel.findOne({ where: { username: username } });
  }
}
