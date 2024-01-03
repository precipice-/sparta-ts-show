import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  role: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  rePassword: string;
}
