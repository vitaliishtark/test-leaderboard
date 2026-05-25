import { Box, Button, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import type { CreateLeaderboardEntryPayload } from "../types/leaderboard";

interface LeaderboardFormProps {
  isSubmitting: boolean;
  onSubmit: (payload: CreateLeaderboardEntryPayload) => Promise<void>;
}

interface FormErrors {
  name?: string;
  score?: string;
}

export function LeaderboardForm({
  isSubmitting,
  onSubmit,
}: LeaderboardFormProps) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const trimmedName = name.trim();
    const numericScore = Number(score);

    if (!trimmedName) {
      nextErrors.name = "Name is required";
    } else if (trimmedName.length < 2) {
      nextErrors.name = "Name must be at least 2 characters";
    }

    if (!score.trim()) {
      nextErrors.score = "Score is required";
    } else if (!Number.isFinite(numericScore)) {
      nextErrors.score = "Score must be a number";
    } else if (!Number.isInteger(numericScore)) {
      nextErrors.score = "Score must be an integer";
    } else if (numericScore < 0) {
      nextErrors.score = "Score must be at least 0";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
        score: Number(score),
      });
    } catch {
      return;
    }

    setName("");
    setScore("");
    setErrors({});
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
          disabled={isSubmitting}
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          fullWidth
          label="Score"
          type="number"
          value={score}
          onChange={(event) => setScore(event.target.value)}
          error={Boolean(errors.score)}
          helperText={errors.score}
          disabled={isSubmitting}
          inputProps={{ min: 0, step: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ minWidth: 140 }}
        >
          {isSubmitting ? "Saving..." : "Add entry"}
        </Button>
      </Stack>
    </Box>
  );
}
