# Leaderboard Backend

NestJS backend API for creating and reading leaderboard entries with Prisma and PostgreSQL.

## Backend Local Run

```bash
npm install
docker compose up -d
npx prisma migrate dev --name init
npm run start:dev
```

The API runs on `http://localhost:3000` by default.

## Endpoints

### `POST /leaderboard`

```json
{
  "name": "Віталій",
  "score": 100
}
```

### `GET /leaderboard`

```bash
GET /leaderboard?page=1&limit=10&sortOrder=desc
```

```json
{
  "data": [
    {
      "id": 1,
      "name": "Віталій",
      "score": 120,
      "createdAt": "2026-05-25T10:00:00.000Z",
      "updatedAt": "2026-05-25T10:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 35,
    "totalPages": 4
  }
}
```
