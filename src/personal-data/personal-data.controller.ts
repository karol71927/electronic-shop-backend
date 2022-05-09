import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JwtUserId } from 'src/jwt-user-id.decorator';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CreatePersonalDataDto } from './dto/create-personal-data.dto';
import { PersonalData } from './personal-data.entity';
import { PersonalDataService } from './personal-data.service';

@Controller('personal-data')
export class PersonalDataController {
  constructor(private personalDataService: PersonalDataService) {}

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  async findOne(@JwtUserId() id: number): Promise<PersonalData> {
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
