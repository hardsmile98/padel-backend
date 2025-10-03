DROP INDEX "idx_matches_group_id";--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "type" varchar(16) DEFAULT null;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "type" varchar(16) DEFAULT null;--> statement-breakpoint
CREATE INDEX "idx_matches_group_id_type" ON "matches" USING btree ("group_id","type");--> statement-breakpoint
CREATE INDEX "idx_teams_category_id_type" ON "teams" USING btree ("category_id","type");