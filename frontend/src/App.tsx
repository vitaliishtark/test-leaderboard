import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { LeaderboardPage } from "./pages/LeaderboardPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#116466",
    },
    secondary: {
      main: "#d9b08c",
    },
    background: {
      default: "#f5efe6",
    },
  },
  typography: {
    fontFamily: '"Trebuchet MS", "Segoe UI", sans-serif',
    h3: {
      fontWeight: 800,
      letterSpacing: "-0.04em",
    },
  },
  shape: {
    borderRadius: 14,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LeaderboardPage />
    </ThemeProvider>
  );
}
