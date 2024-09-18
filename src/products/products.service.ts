import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ListType } from './entities/product.entity';
import { UpdateProductLocationDto } from './dto/update-product-location.dto';
import { clean } from '../helpers';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async getFridgeList() {
    return await this.prisma.item.findMany({ where: { location: 'FRIDGE' } });
  }

  async getShoppingList() {
    return await this.prisma.item.findMany({ where: { location: 'SHOPPING' } });
  }

  async getHomeList() {
    return await this.prisma.item.findMany({ where: { location: 'HOME' } });
  }

  async getFreezerList() {
    return await this.prisma.item.findMany({ where: { location: 'FREEZER' } });
  }

  async createProduct(createProductDto: CreateProductDto) {
    return await this.prisma.item.create({
      data: {
        ...createProductDto,
        bought:
          createProductDto.location !== ListType.SHOPPING ? new Date() : null,
      },
    });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    return await this.prisma.item.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async updateProductLocation(
    id: number,
    updateProductLocationDto: UpdateProductLocationDto,
  ) {
    const product = await this.prisma.item.findUnique({
      where: { id },
    });

    const newLoaction = updateProductLocationDto.location;

    let boughtDate: Date | null = product.bought;
    if (
      newLoaction !== ListType.SHOPPING &&
      product.location === ListType.SHOPPING
    ) {
      boughtDate = new Date();
    }

    if (newLoaction === ListType.SHOPPING) {
      boughtDate = null;
    }

    return await this.prisma.item.update({
      where: { id },
      data: {
        location: newLoaction,
        bought: boughtDate,
      },
    });
  }

  async removeProduct(id: number) {
    return await this.prisma.item.delete({
      where: { id },
    });
  }

  async getOwnedProductsList() {
    const products = await this.prisma.item.findMany({
      where: { bought: { not: null } },
    });

    const productsSet = new Set<string>(products.map((p) => clean(p.name)));

    return Array.from(productsSet);
  }
}
