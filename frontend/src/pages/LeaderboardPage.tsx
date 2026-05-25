import { Alert, Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createLeaderboardEntry, getLeaderboard } from "../api/leaderboardApi";
import { LeaderboardForm } from "../components/LeaderboardForm";
import { LeaderboardTable } from "../components/LeaderboardTable";
import type {
  CreateLeaderboardEntryPayload,
  LeaderboardEntry,
} from "../types/leaderboard";

export function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      const response = await getLeaderboard({
        page: page + 1,
        limit: rowsPerPage,
        sortOrder,
      });

      setEntries(response.data);
      setTotal(response.meta.total);
    } catch (error) {
      setFetchError(
        error instanceof Error ? error.message : "Failed to load leaderboard",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchLeaderboard();
  }, [page, rowsPerPage, sortOrder]);

  const handleCreateEntry = async (payload: CreateLeaderboardEntryPayload) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await createLeaderboardEntry(payload);
      setPage(0);

      if (page === 0) {
        await fetchLeaderboard();
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create entry",
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRowsPerPageChange = (nextRowsPerPage: number) => {
    setRowsPerPage(nextRowsPerPage);
    setPage(0);
  };

  const handleSortChange = () => {
    setSortOrder((currentSortOrder) =>
      currentSortOrder === "desc" ? "asc" : "desc",
    );
    setPage(0);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(17, 100, 102, 0.18), transparent 32rem), linear-gradient(135deg, #f5efe6 0%, #efe2d0 100%)",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Box>
            <Typography component="h1" variant="h3" color="primary">
              Leaderboard
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Add scores and browse ranked entries from the backend API.
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{ p: { xs: 2, md: 3 }, border: "1px solid #ddd1c2" }}
          >
            <Stack spacing={2}>
              <Typography component="h2" variant="h6">
                Add new entry
              </Typography>
              {submitError ? (
                <Alert severity="error">{submitError}</Alert>
              ) : null}
              <LeaderboardForm
                isSubmitting={isSubmitting}
                onSubmit={handleCreateEntry}
              />
            </Stack>
          </Paper>

          <LeaderboardTable
            entries={entries}
            error={fetchError}
            isLoading={isLoading}
            page={page}
            rowsPerPage={rowsPerPage}
            sortOrder={sortOrder}
            total={total}
            onPageChange={setPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            onSortChange={handleSortChange}
          />
        </Stack>
      </Container>
    </Box>
  );
}
