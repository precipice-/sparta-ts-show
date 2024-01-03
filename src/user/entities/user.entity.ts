import { IsEmail, IsInt, IsString, IsStrongPassword } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Show } from 'src/show/entities/show.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column('varchar', { nullable: false })
  email: string;

  @IsString()
  @Column('varchar', { length: 10, nullable: false })
  name: string;

  @IsString()
  @Column('varchar', { length: 10, nullable: false })
  role: string;

  @IsStrongPassword()
  @Column('varchar', { select: false, nullable: false })
  password: string;

  @IsInt()
  @Column('bigint', { default: 1000000 })
  point: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToMany((type) => Show, (show) => show.user)
  shows: Show[];

  @OneToMany((type) => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
