import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createReservationDto: CreateReservationDto, @Req() req) {
    const user = req.user;
    return this.reservationService.create(createReservationDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findOne(@Req() req) {
    const userId = req.user.id;
    return this.reservationService.findOne(userId);
  }
}
