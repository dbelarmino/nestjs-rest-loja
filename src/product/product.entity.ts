class ProductCharacteristic {
  name: string;
  description: string;
}
class ProductImage {
  url: string;
  description: string;
}

export class ProductEntity {
  id: string;
  userId: string;
  name: string;
  value: number;
  quantity: number;
  description: string;
  category: string;
  characteristics: ProductCharacteristic[];
  images: ProductImage[];
}
