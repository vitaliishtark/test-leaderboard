import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { LeaderboardModule } from "./leaderboard/leaderboard.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, LeaderboardModule],
  controllers: [HealthController],
})
export class AppModule {}
