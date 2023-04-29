import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validations/email-is-unique.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'o nome não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'o e-mail informado é inválido' })
  @EmailIsUnique({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @MinLength(6, { message: 'a senha deve ter pelo menos 6 caracteres' })
  password: string;
}
