import { ListType } from '../entities/product.entity';

export class CreateProductDto {
  name: string;
  location: ListType;
}
