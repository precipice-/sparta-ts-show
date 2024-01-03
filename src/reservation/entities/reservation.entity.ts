import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Schedule } from 'src/show/entities/schedule.entity';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((Type) => User, (user) => user.reservations)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @ManyToOne((Type) => Schedule, (schedule) => schedule.reservations)
  @JoinColumn()
  schedule: Schedule;

  @Column()
  scheduleId: number;
}
