import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appdatasource } from './utils/appdatasource';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CohortModule } from './cohort/cohort.module';
import { StudentsModule } from './students/students.module';
import { NatsClientModule } from './nats-client/nats-client.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { FormsModule } from './forms/forms.module';
import { NotificationModule } from './notification/notification.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(Appdatasource.options),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    NatsClientModule,
    AuthModule,
    UserModule,
    CohortModule,
    StudentsModule,
    ActivityLogModule,
    FormsModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private Appdatasource: DataSource) {}
}
