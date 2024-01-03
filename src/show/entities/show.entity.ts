import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Schedule } from './schedule.entity';

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column('varchar', { length: 20, nullable: false })
  name: string;

  @IsString()
  @Column('varchar', { length: 20, nullable: false })
  place: string;

  @IsNumber()
  @Column({ nullable: false })
  price: number;

  @IsString()
  @Column({ nullable: false })
  category: string;

  @IsString()
  @Column({ nullable: false })
  introduction: string;

  @IsString()
  @Column({ nullable: false })
  image: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne((type) => User, (user) => user.shows)
  @JoinColumn()
  user: User;

  @OneToMany((type) => Schedule, (schedule) => schedule.show, {
    cascade: true,
  })
  schedules: Schedule[];
}
