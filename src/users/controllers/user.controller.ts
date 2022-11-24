import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { UserDto } from '../dto/UserDto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async all() {
    return this.userService.findAll();
  }

  @Post('/create')
  async createUser(@Body() user: UserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
