import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductCharacteristicDTO } from './product-characteristic.dto';
import { ProductImageDTO } from './product-image.dto';
import { Type } from 'class-transformer';

export class CreateProductDTO {
  @IsUUID(undefined, { message: 'ID do usuário é invalido' })
  userId: string;

  @IsNotEmpty({ message: 'o nome não pode ser vazio' })
  name: string;

  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: 'o valor precisa ter duas casas decimais' },
  )
  @Min(1, { message: 'o valor precisa ser maior que zero' })
  value: number;

  @IsNumber()
  @Min(0, { message: 'a quantidade precisa ser maior que zero' })
  quantity: number;

  @IsString()
  @IsNotEmpty({ message: 'a descrição não pode ser vazio' })
  @MaxLength(1000, {
    message: 'a descrição não pode ter mais de 1000 caracteres',
  })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'a categoria não pode ser vazio' })
  category: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductCharacteristicDTO)
  characteristics: ProductCharacteristicDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];
}
