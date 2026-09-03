import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaqueteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'La URL de la imagen es obligatoria' })
  imagen: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @IsString()
  @IsNotEmpty({ message: 'El destino es obligatorio' })
  destino: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  precio: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'La duración en días debe ser un número' })
  @Min(1, { message: 'La duración debe ser de al menos 1 día' })
  duracionDias: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Los cupos disponibles deben ser un número' })
  @Min(0, { message: 'Los cupos no pueden ser negativos' })
  cuposDisponibles: number;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
