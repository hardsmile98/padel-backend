import { Module } from '@nestjs/common';
import { AdminApiModule } from './admin-api/admin-api.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './common/db/db.module';
import { AuthGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { FrontModule } from './front-api/front.module';

@Module({
  imports: [
    DbModule,
    AdminApiModule,
    FrontModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
