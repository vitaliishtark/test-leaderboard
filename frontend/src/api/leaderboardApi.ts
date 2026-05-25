import type {
  CreateLeaderboardEntryPayload,
  GetLeaderboardParams,
  PaginatedLeaderboardResponse,
  LeaderboardEntry,
} from "../types/leaderboard";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.json() as Promise<T>;
}

export function getLeaderboard({
  page,
  limit,
  sortOrder,
}: GetLeaderboardParams): Promise<PaginatedLeaderboardResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortOrder,
  });

  return request<PaginatedLeaderboardResponse>(`/leaderboard?${params}`);
}

export function createLeaderboardEntry(
  payload: CreateLeaderboardEntryPayload,
): Promise<LeaderboardEntry> {
  return request<LeaderboardEntry>("/leaderboard", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
