import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [AuthModule, PlayersModule],
  controllers: [],
  providers: [],
})
export class AdminApiModule {}
