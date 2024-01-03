import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/user/types/userRole.type';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createShow(@Body() createShowDto: CreateShowDto, @Req() req) {
    const user = req.user;

    if (user.role !== Role.Admin) {
      throw new UnauthorizedException('관리자만 공연 등록이 가능합니다.');
    }

    return await this.showService.create(createShowDto, user);
  }

  @Get()
  async findAllShow() {
    return await this.showService.findAll();
  }

  @Get('keyword')
  async findOneShowBykeyword(@Query('keyword') keyword: string) {
    return await this.showService.findKeyword(keyword);
  }

  @Get(':id')
  async findOneShow(@Param('id') id: number) {
    return await this.showService.findOne(id);
  }
}
