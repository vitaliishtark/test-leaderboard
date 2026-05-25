import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLeaderboardEntryDto } from "./dto/create-leaderboard-entry.dto";
import { GetLeaderboardQueryDto } from "./dto/get-leaderboard-query.dto";

@Injectable()
export class LeaderboardService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLeaderboardEntryDto: CreateLeaderboardEntryDto) {
    return this.prisma.leaderboardEntry.create({
      data: createLeaderboardEntryDto,
    });
  }

  async findAll({ page, limit, sortOrder }: GetLeaderboardQueryDto) {
    const skip = (page - 1) * limit;
    const orderBy: Prisma.LeaderboardEntryOrderByWithRelationInput[] = [
      { score: sortOrder },
      { createdAt: "asc" },
    ];

    const [data, total] = await this.prisma.$transaction([
      this.prisma.leaderboardEntry.findMany({
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.leaderboardEntry.count(),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
