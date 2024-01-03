import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  scheduleId: number;
}
