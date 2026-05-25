import {
  Alert,
  Box,
  CircularProgress,
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
import type { LeaderboardEntry } from "../types/leaderboard";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  error: string | null;
  isLoading: boolean;
  page: number;
  rowsPerPage: number;
  sortOrder: "asc" | "desc";
  total: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onSortChange: () => void;
}

export function LeaderboardTable({
  entries,
  error,
  isLoading,
  page,
  rowsPerPage,
  sortOrder,
  total,
  onPageChange,
  onRowsPerPageChange,
  onSortChange,
}: LeaderboardTableProps) {
  return (
    <Paper
      elevation={0}
      sx={{ overflow: "hidden", border: "1px solid #ddd1c2" }}
    >
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
                  onClick={onSortChange}
                >
                  Score
                </TableSortLabel>
              </TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
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

            {!isLoading
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
        onPageChange={(_, nextPage) => onPageChange(nextPage)}
        onRowsPerPageChange={(event) =>
          onRowsPerPageChange(Number(event.target.value))
        }
      />
    </Paper>
  );
}
