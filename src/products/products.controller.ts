import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductLocationDto } from 'src/products/dto/update-product-location.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('fridge')
  getFridgeList() {
    return this.productsService.getFridgeList();
  }

  @Get('shopping')
  getShoppingList() {
    return this.productsService.getShoppingList();
  }

  @Get('home')
  getHomeList() {
    return this.productsService.getHomeList();
  }

  @Get('freezer')
  getFreezerList() {
    return this.productsService.getFreezerList();
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(+id, updateProductDto);
  }

  @Patch(':id/location')
  updateLocation(
    @Param('id') id: string,
    @Body() updateProductLocationDto: UpdateProductLocationDto,
  ) {
    return this.productsService.updateProductLocation(
      +id,
      updateProductLocationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.removeProduct(+id);
  }

  @Get('owned')
  getOwnedProductsList() {
    return this.productsService.getOwnedProductsList();
  }
}
