import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateLeaderboardEntryDto } from "./dto/create-leaderboard-entry.dto";
import { GetLeaderboardQueryDto } from "./dto/get-leaderboard-query.dto";
import { LeaderboardService } from "./leaderboard.service";

@Controller("leaderboard")
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post()
  create(@Body() createLeaderboardEntryDto: CreateLeaderboardEntryDto) {
    return this.leaderboardService.create(createLeaderboardEntryDto);
  }

  @Get()
  findAll(@Query() query: GetLeaderboardQueryDto) {
    return this.leaderboardService.findAll(query);
  }
}
