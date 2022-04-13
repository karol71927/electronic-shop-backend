import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  email: string;

  type: Role;
}
