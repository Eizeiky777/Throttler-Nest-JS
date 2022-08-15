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

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Post()
  create(@Body() createPublicDto: CreatePublicDto) {
    return this.publicService.create(createPublicDto);
  }

  @UseGuards(ThrottlerBehindProxyGuard)
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
