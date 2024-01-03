import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
//import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { DataSource, Repository } from 'typeorm';
import { Schedule } from 'src/show/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // 트렌젝션을 위한 초석
    private readonly dataSource: DataSource,
  ) {}

  // 예매하기 API
  async create(createReservationDto: CreateReservationDto, user) {
    // 트렌젝션을 위한 초석
    const reservation = await this.dataSource.transaction(async (manager) => {
      const userId = user.id;
      // 해당유저의 포인트
      const userPoint = user.point;
      const { scheduleId } = createReservationDto;
      const show = await this.findSeat(scheduleId);
      const showPrice = show.show.price;

      // 그 공연날짜의 예매 가능 좌석 수 가져오기
      const seat = show.availableSeat;

      if (seat < 1) {
        throw new ForbiddenException('좌석이 없어서 예매가 불가능합니다.');
      }
      //예약을 하면 예매가능 좌석수를 줄여야 한다.
      const remainingSeat = seat - 1;

      // 남은 좌석수를 업데이트 해준다.
      await manager.update(
        Schedule,
        { id: scheduleId },
        { availableSeat: remainingSeat },
      );

      // 공연 가격과 남은 포인트를 비교하기
      if (userPoint < showPrice) {
        throw new ForbiddenException('포인트가 부족하여 예매가 불가능합니다.');
      }

      // 공연을 예매하면 유저가 가지고 있는 포인트 차감하기
      const remainingPoint = userPoint - showPrice;

      // 차감한 포인트를 db에 업데이트 해주기
      await manager.update(User, { id: userId }, { point: remainingPoint });

      const reservationShow = await manager.save(Reservation, {
        userId,
        scheduleId,
      });

      return {
        reservationShow,
        dateTime: show.dateTime,
        place: show.show.place,
        price: showPrice,
      };
    });

    return reservation;
  }

  // 해당 공연의 좌석수를 가져오기 위한 함수
  async findSeat(scheduleId) {
    const show = await this.scheduleRepository.findOne({
      where: {
        id: scheduleId,
      },
      relations: {
        show: true,
      },
    });

    if (!show) {
      throw new NotFoundException('해당 공연은 존재하지 않습니다.');
    }

    return show;
  }

  //예매 확인하기 API
  async findOne(userId) {
    const reservation = await this.reservationRepository.find({
      where: {
        userId,
      },
      order: { createdAt: 'DESC' },
    });

    if (reservation.length < 1) {
      throw new NotFoundException('예매하신 내역이 없습니다.');
    }

    return reservation;
  }
}
