import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class LoginWithCredentialDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  keepMeSignIn: boolean;
}
