import { Module } from "@nestjs/common";
import { LeaderboardModule } from "./leaderboard/leaderboard.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, LeaderboardModule],
})
export class AppModule {}
