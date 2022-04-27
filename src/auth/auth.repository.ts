import {
  IsDate,
  IsEmail,
  IsString,
  Length,
  MinLength,
  validate,
} from 'class-validator';
import { Trim } from 'class-sanitizer';
export class UserRegisterDto {
  @IsString()
  @Trim()
  @MinLength(5, { message: 'UserName should be minimum of 5 characters' })
  public userName?: string;

  @IsString()
  @Trim()
  @MinLength(5, { message: 'Name should be minimum of 5 characters' })
  public name?: string;

  @IsEmail({}, { message: 'Provided Email is not valid' })
  @Trim()
  public email?: string;

  @IsString()
  @MinLength(8, { message: 'Password should be minimum of 8 characters' })
  public password?: string;
}

export class UserLoginDto {
  @IsEmail({}, { message: 'Provided Email is not valid' })
  @Trim()
  public email: string;

  @IsString()
  @MinLength(8, { message: 'Password should be minimum of 8 characters' })
  public password: string;
}

export class UserChangePasswordDto {
  @IsEmail({}, { message: 'Provided Email is not valid' })
  @Trim()
  public password: string;

  @IsString()
  @MinLength(8, { message: 'Password should be minimum of 8 characters' })
  public passwordNew: string;

  @IsString()
  @MinLength(8, { message: 'Password should be minimum of 8 characters' })
  public passwordConfirm: string;
}
