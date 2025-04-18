import { Module } from '@nestjs/common';
import { SettingModule } from './setting/setting.module';
import { ConfigModule } from '@nestjs/config'; // Module de configuration pour .env
import { NotificationsModule } from './notifications/notifications.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ProductVariantModule } from './product_variant/product_variant.module';
import { ProductAttributeModule } from './product_attribute/product_attribute.module';
import { ProductAttributeValueModule } from './product_attribute_value/product_attribute_value.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart_item/cart_item.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order_item/order_item.module';
import { PaymentModule } from './payment/payment.module';
import { ShippingAddressModule } from './shipping/shipping_address.module';
import { ShippingMethodModule } from './shipping/shipping_method.module';
import { OrderShipmentModule } from './shipping/order_shipment.module';
import { CommissionModule } from './commission/commission.module';
import { CouponModule } from './coupon/coupon.module';
import { ReturnModule } from './return/return.module';
import { FinancialTransactionModule } from './financial_transaction/financial_transaction.module';
import { AuthModule } from './auth/auth.module'; // Module d'authentification
import { AdminModule } from './admin/admin.module'; // Module d'administration

@Module({
  imports: [
    // Module pour la gestion des paramètres globaux
    SettingModule,
    // Charge automatiquement les variables d'environnement du fichier .env à la racine
    ConfigModule.forRoot({
      isGlobal: true, // Rend la config accessible partout
      envFilePath: '.env',
    }),
    NotificationsModule, // Module pour notifications temps réel admin (WebSocket)
    // Configuration de GraphQL avec autoSchemaFile pour générer le schéma automatiquement
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      debug: true,
    }),
    UserModule,
    ProductModule,
    ProductVariantModule,
    ProductAttributeModule,
    ProductAttributeValueModule,
    CartModule,
    CartItemModule,
    OrderModule,
    OrderItemModule,
    PaymentModule,
    ShippingAddressModule,
    ShippingMethodModule,
    OrderShipmentModule,
    CommissionModule,
    CouponModule,
    ReturnModule,
    FinancialTransactionModule,
    AuthModule, // Expose les routes d'auth (login/register)
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

