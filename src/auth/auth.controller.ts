import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Role } from 'src/user/types/userRole.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // /auth/sign-in
  // @Post => 핸들러
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  // /auth/sign-up
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const { role } = signUpDto;

    if (role !== Role.Admin && role !== Role.User) {
      throw new BadRequestException('관리자 및 유저만 선택이 가능합니다.');
    }

    return await this.authService.signUp(signUpDto);
  }
}
