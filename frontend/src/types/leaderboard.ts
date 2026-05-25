export interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeaderboardEntryPayload {
  name: string;
  score: number;
}

export interface GetLeaderboardParams {
  page: number;
  limit: number;
  sortOrder: "asc" | "desc";
}

export interface PaginatedLeaderboardResponse {
  data: LeaderboardEntry[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
