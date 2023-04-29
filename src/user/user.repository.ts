import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  private async findById(id: string): Promise<UserEntity | Error> {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new Error('Usuário não existe');

    return user;
  }

  async create(data: UserEntity): Promise<void> {
    this.users.push(data);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async emailExist(email: string): Promise<boolean> {
    const user = this.users.find((user) => user.email === email);

    return !user;
  }

  async update(
    id: string,
    data: Partial<UserEntity>,
  ): Promise<UserEntity | Error> {
    const user = await this.findById(id);

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async delete(id: string): Promise<UserEntity | Error> {
    const user = await this.findById(id);
    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
