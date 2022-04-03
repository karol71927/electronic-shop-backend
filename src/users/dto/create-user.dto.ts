import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  // @Exclude()
  password: string;

  @IsEmail()
  email: string;

  type: Role;
}
