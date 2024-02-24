import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}

export class UpdateUserDto {
  @IsString()
  readonly name?: string;

  @IsEmail()
  readonly email?: string;

  @IsString()
  @MinLength(6)
  readonly password?: string;
}
