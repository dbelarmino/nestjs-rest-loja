import { randomUUID } from 'crypto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { ListUserDTO } from './dto/list-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) { }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.id = randomUUID();
    userEntity.name = data.name;
    userEntity.email = data.email;
    userEntity.password = data.password;

    await this.userRepository.create(userEntity);

    return { id: userEntity.id };
  }

  @Get()
  async find() {
    const users = await this.userRepository.findAll();
    const listUsers = users.map((user) => new ListUserDTO(user.id, user.name));
    return listUsers;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, data);

    return { ...updatedUser };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.userRepository.delete(id);
    return { ...deletedUser };
  }
}
