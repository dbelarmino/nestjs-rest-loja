import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductEntity } from './product.entity';
import { randomUUID } from 'crypto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) { }

  @Post()
  async create(@Body() data: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.id = randomUUID();
    productEntity.userId = data.userId;
    productEntity.name = data.name;
    productEntity.description = data.description;
    productEntity.quantity = data.quantity;
    productEntity.category = data.category;
    productEntity.value = data.value;
    productEntity.characteristics = data.characteristics;
    productEntity.images = data.images;

    await this.productRepository.create(productEntity);

    return { ...productEntity };
  }

  @Get()
  async findAll() {
    const products = await this.productRepository.findAll();
    return { ...products };
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateProductDTO) {
    const updatedProduct = await this.productRepository.update(id, data);

    return { ...updatedProduct };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const deletedProduct = await this.productRepository.delete(id);
    return { deletedProduct };
  }
}
