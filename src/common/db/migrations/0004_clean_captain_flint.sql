CREATE INDEX "idx_players_slug" ON "players" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_categories_parent_category_id" ON "categories" USING btree ("parent_category_id");--> statement-breakpoint
CREATE INDEX "idx_categories_stage_id" ON "categories" USING btree ("stage_id");--> statement-breakpoint
CREATE INDEX "idx_groups_category_id" ON "groups" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "idx_matches_group_id" ON "matches" USING btree ("group_id");--> statement-breakpoint
CREATE INDEX "idx_stages_tournament_id" ON "stages" USING btree ("tournament_id");--> statement-breakpoint
CREATE INDEX "idx_teams_group_id" ON "teams" USING btree ("group_id");