import { IsEmail, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
  })
  password: string;
}
