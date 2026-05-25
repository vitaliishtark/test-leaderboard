import {
  Alert,
  Box,
  CircularProgress,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../api/leaderboardApi";
import type { LeaderboardEntry } from "../types/leaderboard";

interface LeaderboardTableProps {
  refreshKey: number;
}

export function LeaderboardTable({ refreshKey }: LeaderboardTableProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getLeaderboard(
          {
            page: page + 1,
            limit: rowsPerPage,
            sortOrder,
          },
          controller.signal,
        );

        setEntries(response.data);
        setTotal(response.meta.total);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Failed to load leaderboard",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void fetchLeaderboard();

    return () => controller.abort();
  }, [page, rowsPerPage, sortOrder, refreshKey]);

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

  const isInitialLoading = isLoading && entries.length === 0;

  return (
    <Paper
      elevation={0}
      sx={{ overflow: "hidden", border: "1px solid #ddd1c2" }}
    >
      {isLoading && !isInitialLoading ? <LinearProgress /> : null}

      {error ? (
        <Alert severity="error" sx={{ borderRadius: 0 }}>
          {error}
        </Alert>
      ) : null}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={90}>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell sortDirection={sortOrder}>
                <TableSortLabel
                  active
                  direction={sortOrder}
                  onClick={handleSortChange}
                >
                  Score
                </TableSortLabel>
              </TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isInitialLoading ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", py: 6 }}
                  >
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : null}

            {!isLoading && entries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography
                    color="text.secondary"
                    align="center"
                    sx={{ py: 5 }}
                  >
                    No leaderboard entries yet.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}

            {!isInitialLoading
              ? entries.map((entry, index) => (
                  <TableRow hover key={entry.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.score}</TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(entry.createdAt))}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageChange={(_, nextPage) => setPage(nextPage)}
        onRowsPerPageChange={(event) =>
          handleRowsPerPageChange(Number(event.target.value))
        }
      />
    </Paper>
  );
}
