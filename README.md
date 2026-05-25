# Leaderboard App

Fullstack leaderboard application for creating score entries and browsing them with backend-driven pagination and score sorting.

## Tech Stack

- React
- Vite
- TypeScript
- Material UI
- NestJS
- Prisma
- PostgreSQL

## Project Structure

```text
.
├── src/                  # NestJS backend
├── prisma/               # Prisma schema and migrations
├── frontend/             # React/Vite frontend
├── docker-compose.yml    # Local PostgreSQL
└── Dockerfile            # Backend production image
```

## Local Development

### Backend

Run from the repository root:

```bash
npm install
docker compose up -d
npx prisma migrate dev --name init
npm run start:dev
```

The backend runs on `http://localhost:3000` by default.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

If you prefer using the root package scripts for local development, you can also run `npm run dev` from the repository root.

## Environment Variables

### Backend `.env.example`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/leaderboard_db?schema=public"
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Frontend `frontend/.env.example`

```env
VITE_API_URL=http://localhost:3000
```

Do not commit real `.env` files. They are ignored by git.

## API

### `POST /leaderboard`

Creates a leaderboard entry.

```json
{
  "name": "Віталій",
  "score": 100
}
```

### `GET /leaderboard?page=1&limit=10&sortOrder=desc`

Returns paginated leaderboard entries sorted by `score`, with secondary sorting by `createdAt` ascending.

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

### `GET /health`

Health check endpoint for deployment platforms.

```json
{
  "status": "ok"
}
```

## Production Deployment Notes

Use a managed PostgreSQL database in production. Set `DATABASE_URL` in the backend hosting provider to the managed database connection string.

Run Prisma migrations in production with:

```bash
npx prisma migrate deploy
```

Set `FRONTEND_URL` in the backend hosting provider to the deployed frontend URL so CORS allows browser requests.

Set `VITE_API_URL` in the frontend hosting provider to the deployed backend URL before building the frontend.

Build the backend from the repository root:

```bash
npm install
npm run prisma:generate
npm run build
npm run start:prod
```

Build the frontend from `frontend/`:

```bash
cd frontend
npm install
npm run build
```

The backend `Dockerfile` builds the NestJS app, generates the Prisma client, and starts with `npm run start:prod`. It does not copy local `.env` files into the image.
