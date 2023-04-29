import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  private async findById(id: string): Promise<ProductEntity | Error> {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw new Error('Usuário não existe');

    return product;
  }

  async create(data: ProductEntity): Promise<void> {
    this.products.push(data);
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.products;
  }

  async update(
    id: string,
    data: Partial<ProductEntity>,
  ): Promise<ProductEntity | Error> {
    const product = await this.findById(id);

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id' || key === 'userId') {
        return;
      }

      product[key] = value;
    });

    return product;
  }

  async delete(id: string): Promise<ProductEntity | Error> {
    const product = await this.findById(id);
    this.products = this.products.filter((product) => product.id !== id);

    return product;
  }
}
