import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PaquetesService } from './paquetes.service.js';
import { CreatePaqueteDto } from './dto/create-paquete.dto.js';
import { UpdatePaqueteDto } from './dto/update-paquete.dto.js';
import { PaginationQueryDto } from './dto/pagination-query.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('paquetes')
export class PaquetesController {
  constructor(private readonly paquetesService: PaquetesService) {}

  // Endpoints de LECTURA (Públicos)
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.paquetesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paquetesService.findOne(id);
  }

  // Endpoints de ESCRITURA (Protegidos con JwtAuthGuard - Requerimiento #10)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPaqueteDto: CreatePaqueteDto) {
    return this.paquetesService.create(createPaqueteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaqueteDto: UpdatePaqueteDto) {
    return this.paquetesService.update(id, updatePaqueteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paquetesService.remove(id);
  }
}
