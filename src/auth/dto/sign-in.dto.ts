import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: '이메일을 입력하세요' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: '패스워드를 입력하세요' })
  @IsString()
  password: string;
}
