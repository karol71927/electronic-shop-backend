import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonalDataDto } from './dto/create-personal-data.dto';
import { PersonalData } from './personal-data.entity';

@Injectable()
export class PersonalDataService {
  constructor(
    @InjectRepository(PersonalData)
    private personalDataRepository: Repository<PersonalData>,
  ) {}

  findAll(): Promise<PersonalData[]> {
    return this.personalDataRepository.find();
  }

  findOne(id: number): Promise<PersonalData> {
    return this.personalDataRepository.findOne(id);
  }

  create(personalData: PersonalData) {
    this.personalDataRepository.create(personalData);
  }

  async update(id: number, createPersonalDataDto: CreatePersonalDataDto) {
    let personalData = await this.personalDataRepository.findOne(id);
    personalData = createPersonalDataDto as unknown as PersonalData;
    return this.personalDataRepository.save(personalData);
  }

  async remove(id: number): Promise<void> {
    await this.personalDataRepository.delete(id);
  }
}
