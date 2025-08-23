import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { TournamentsModule } from './tournaments/tournaments.module';

@Module({
  imports: [AuthModule, PlayersModule, TournamentsModule],
  controllers: [],
  providers: [],
})
export class AdminApiModule {}
