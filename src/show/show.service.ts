import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import _ from 'lodash';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  // 공연 생성하기
  async create(createShowDto: CreateShowDto, user) {
    const {
      name,
      dateTimes,
      place,
      image,
      price,
      seats,
      availableSeats,
      category,
      introduction,
    } = createShowDto;

    const userId = user.id;

    const foundShow = await this.showRepository.findOne({
      where: { name },
    });

    if (!_.isNil(foundShow)) {
      throw new ConflictException('이미 존재하는 공연 이름입니다.');
    }

    // [{dateTime: 시간1}, {dateTime: 시간2}, ...] -=> mkDateTime
    const mkDateTime = dateTimes.map((dateTime) => {
      return { dateTime };
    });

    // 좌석수는 배열로 등록
    const mkSeat = seats.map((seat) => {
      return { seat };
    });

    // datetime과 seat 합쳐서 만들기
    const dateTimeAndSeat = mkDateTime.map((datetime, index) => ({
      ...datetime,
      ...mkSeat[index],
    }));

    // 이용가능 좌석 만들기
    const mkAvailableSeat = availableSeats.map((availableSeat) => {
      return { availableSeat };
    });

    const schedules = dateTimeAndSeat.map((datetimeSeat, index) => ({
      ...datetimeSeat,
      ...mkAvailableSeat[index],
    }));

    const createShow = await this.showRepository.save({
      name,
      place,
      price,
      schedules,
      user: userId,
      image,
      category,
      introduction,
    });

    return createShow;
  }

  // 공연 목록 조회
  async findAll() {
    const shows = await this.showRepository.find();
    if (shows.length < 1) {
      throw new NotFoundException('조회할 공연 목록이 없습니다.');
    }

    return shows;
  }

  // 공연 상세 조회
  async findOne(id: number) {
    const show = await this.showRepository.findOne({
      where: { id },
      relations: {
        schedules: true,
      },
    });

    if (!show) {
      throw new NotFoundException('조회할 공연 목록이 없습니다.');
    }

    const message = show.schedules.map((schedule) => {
      if (schedule.availableSeat > 0) {
        return `${schedule.id}번 공연의 예매가 가능합니다.`;
      }

      return `${schedule.id}번 공연의 예매가 불가능합니다.`;
    });

    return { show, message };
  }

  // 공연 keyword 조회
  async findKeyword(keyword: string) {
    const show = await this.showRepository.find({
      where: {
        name: Like(`%${keyword}%`),
      },
    });

    if (!show.length) {
      throw new NotFoundException('조회할 공연 목록이 없습니다.');
    }

    return show;
  }
}
