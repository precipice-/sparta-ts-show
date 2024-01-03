import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Show])],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
