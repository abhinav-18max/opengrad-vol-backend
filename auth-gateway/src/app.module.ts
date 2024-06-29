import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appdatasource } from './utils/appdatasource';
import { ConfigModule } from '@nestjs/config';
import { CohortModule } from './cohort/cohort.module';
import { StudentsModule } from './students/students.module';
import { NatsClientModule } from './nats-client/nats-client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(Appdatasource.options),
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    NatsClientModule,
    AuthModule,
    UserModule,
    CohortModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private Appdatasource: DataSource) {}
}
