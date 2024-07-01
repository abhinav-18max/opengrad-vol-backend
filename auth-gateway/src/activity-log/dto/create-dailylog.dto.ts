import { IsDate, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLogDto } from './create-log.dto';

export class CreateDailyLogDto {
  @IsNotEmpty()
  @IsNumber()
  vol_id: number;
  @IsNotEmpty()
  @IsDate()
  Date: Date;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLogDto)
  Logs: CreateLogDto[];
}
