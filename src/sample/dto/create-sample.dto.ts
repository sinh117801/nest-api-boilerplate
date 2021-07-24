import { IsString } from 'class-validator';

export class CreateSampleDto {
  @IsString()
  name: string;
}
