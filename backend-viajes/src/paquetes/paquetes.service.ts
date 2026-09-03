import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePaqueteDto } from './dto/create-paquete.dto.js';
import { UpdatePaqueteDto } from './dto/update-paquete.dto.js';
import { PaginationQueryDto } from './dto/pagination-query.dto.js';

@Injectable()
export class PaquetesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaqueteDto: CreatePaqueteDto) {
    return this.prisma.paqueteTuristico.create({
      data: createPaqueteDto,
    });
  }

  async findAll(query: PaginationQueryDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where = query.search
      ? {
          nombre: {
            contains: query.search,
          },
        }
      : {};

    const [total, data] = await Promise.all([
      this.prisma.paqueteTuristico.count({ where }),
      this.prisma.paqueteTuristico.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async findOne(id: string) {
    const paquete = await this.prisma.paqueteTuristico.findUnique({
      where: { id },
    });

    if (!paquete) {
      throw new NotFoundException(`Paquete turístico con ID "${id}" no encontrado`);
    }

    return paquete;
  }

  async update(id: string, updatePaqueteDto: UpdatePaqueteDto) {
    await this.findOne(id);
    return this.prisma.paqueteTuristico.update({
      where: { id },
      data: updatePaqueteDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.paqueteTuristico.delete({
      where: { id },
    });
  }
}
