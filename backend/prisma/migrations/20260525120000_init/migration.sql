-- CreateTable
CREATE TABLE "leaderboard_entries" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leaderboard_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "leaderboard_entries_score_idx" ON "leaderboard_entries"("score");
