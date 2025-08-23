ALTER TABLE "teams" DROP CONSTRAINT "teams_tournament_id_tournaments_id_fk";
--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "tournament_id";