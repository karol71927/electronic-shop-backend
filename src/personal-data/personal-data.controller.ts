import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePersonalDataDto } from './dto/create-personal-data.dto';
import { PersonalData } from './personal-data.entity';
import { PersonalDataService } from './personal-data.service';

@Controller('personal-data')
export class PersonalDataController {
  constructor(private personalDataService: PersonalDataService) {}

  @Get()
  async findAll(): Promise<PersonalData[]> {
    return this.personalDataService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PersonalData> {
    return this.personalDataService.findOne(id);
  }

  @Post()
  async save(@Body() createPersonalDataDto: CreatePersonalDataDto) {
    this.personalDataService.save(createPersonalDataDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createPersonalDataDto: CreatePersonalDataDto,
  ) {
    this.personalDataService.update(id, createPersonalDataDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.personalDataService.remove(id);
  }
}
