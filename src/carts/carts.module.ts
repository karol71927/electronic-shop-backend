import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { CartsController } from './carts.controller';
import { Cart } from './carts.entity';
import { CartsService } from './carts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), ProductsModule, UsersModule],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
