import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalDataController } from './personal-data.controller';
import { PersonalData } from './personal-data.entity';
import { PersonalDataService } from './personal-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalData])],
  controllers: [PersonalDataController],
  providers: [PersonalDataService],
})
export class PersonalDataModule {}
