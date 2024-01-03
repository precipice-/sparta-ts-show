import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShowDto {
  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsDateString({}, { each: true })
  dateTimes: Date[];

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  place: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsNumber()
  price: number;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsNumber({}, { each: true })
  seats: number[];

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsNumber({}, { each: true })
  availableSeats: number[];

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  category: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  introduction: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  image: string;
}
