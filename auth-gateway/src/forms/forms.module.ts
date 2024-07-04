import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { LocalStrategy } from 'src/auth/passport/local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [NatsClientModule],
  providers: [
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [FormsController],
})
export class FormsModule {}
