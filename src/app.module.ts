import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config';
import { OrderModule } from './order/order.module';
import { OrderService } from './order/order.service'



@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService, OrderService]
})
export class AppModule {}
