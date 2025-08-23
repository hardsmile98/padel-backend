ALTER TABLE "teams" DROP CONSTRAINT "teams_stage_id_stages_id_fk";
--> statement-breakpoint
ALTER TABLE "teams" DROP CONSTRAINT "teams_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "stage_id";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "category_id";