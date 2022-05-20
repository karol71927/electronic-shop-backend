import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtUserId } from 'src/jwt-user-id.decorator';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { CreatePersonalDataDto } from './dto/create-personal-data.dto';
import { PersonalData } from './personal-data.entity';
import { PersonalDataService } from './personal-data.service';

@Controller('personal-data')
export class PersonalDataController {
  constructor(private personalDataService: PersonalDataService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async findOne(@JwtUserId() id: number): Promise<PersonalData> {
    return this.personalDataService.findOne(id);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async save(
    @Body() createPersonalDataDto: CreatePersonalDataDto,
    @JwtUserId() id: number,
  ) {
    createPersonalDataDto.id = id;
    this.personalDataService.save(createPersonalDataDto);
  }

  @Put('')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async update(
    @JwtUserId() id: number,
    @Body() createPersonalDataDto: CreatePersonalDataDto,
  ) {
    this.personalDataService.update(id, createPersonalDataDto);
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async remove(@JwtUserId() id: number) {
    this.personalDataService.remove(id);
  }
}
