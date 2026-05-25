import { Alert, Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { createLeaderboardEntry } from "../api/leaderboardApi";
import { LeaderboardForm } from "../components/LeaderboardForm";
import { LeaderboardTable } from "../components/LeaderboardTable";
import type { CreateLeaderboardEntryPayload } from "../types/leaderboard";

export function LeaderboardPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [tableRefreshKey, setTableRefreshKey] = useState(0);

  const handleCreateEntry = async (payload: CreateLeaderboardEntryPayload) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await createLeaderboardEntry(payload);
      setTableRefreshKey((currentKey) => currentKey + 1);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create entry",
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
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

          <LeaderboardTable refreshKey={tableRefreshKey} />
        </Stack>
      </Container>
    </Box>
  );
}
