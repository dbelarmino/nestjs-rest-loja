import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductCharacteristicDTO } from './product-characteristic.dto';
import { ProductImageDTO } from './product-image.dto';
import { Type } from 'class-transformer';

export class UpdateProductDTO {
  @IsUUID(undefined, { message: 'ID do usuário é invalido' })
  userId: string;

  @IsNotEmpty({ message: 'o nome não pode ser vazio' })
  @IsOptional()
  name: string;

  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: 'o valor precisa ter duas casas decimais' },
  )
  @Min(1, { message: 'o valor precisa ser maior que zero' })
  @IsOptional()
  value: number;

  @IsNumber()
  @Min(0, { message: 'a quantidade precisa ser maior que zero' })
  @IsOptional()
  quantity: number;

  @IsString()
  @IsNotEmpty({ message: 'a descrição não pode ser vazio' })
  @MaxLength(1000, {
    message: 'a descrição não pode ter mais de 1000 caracteres',
  })
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'a categoria não pode ser vazio' })
  @IsOptional()
  category: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductCharacteristicDTO)
  @IsOptional()
  characteristics: ProductCharacteristicDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  @IsOptional()
  images: ProductImageDTO[];
}
