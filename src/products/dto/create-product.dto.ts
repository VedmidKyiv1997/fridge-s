import { ListType } from 'src/products/entities/product.entity';

export class CreateProductDto {
  name: string;
  location: ListType;
}
