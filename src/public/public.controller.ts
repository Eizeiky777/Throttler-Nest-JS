/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PublicService } from './public.service';
import { CreatePublicDto } from './dto/create-public.dto';
import { UpdatePublicDto } from './dto/update-public.dto';
import { ThrottlerBehindProxyGuard } from 'src/guards/throttler/throttler';
import { SkipThrottle, Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigService } from 'src/config/config.service';

@Controller('public')
export class PublicController {
  constructor(
    private readonly publicService: PublicService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createPublicDto: CreatePublicDto) {
    return this.publicService.create(createPublicDto);
  }

  @SkipThrottle(false)
  @UseGuards(ThrottlerGuard)
  @Throttle(5, 2)
  @Get()
  findAll() {
    return this.publicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicDto: UpdatePublicDto) {
    return this.publicService.update(+id, updatePublicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicService.remove(+id);
  }
}
