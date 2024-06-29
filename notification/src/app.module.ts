import { Module } from '@nestjs/common';
import { CohortNotificationModule } from './cohort-notification/cohort-notification.module';
import { PocNotificationModule } from './poc-notification/poc-notification.module';
import { NatsClientModule } from './nats-client/nats-client.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appdatasource } from './utils/appdatasource';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(Appdatasource.options),
    NatsClientModule,
    CohortNotificationModule,
    PocNotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private Appdatasource: DataSource) {}
}
