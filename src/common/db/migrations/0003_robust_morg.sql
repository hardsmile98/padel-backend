ALTER TABLE "teams" ALTER COLUMN "group_id" SET DEFAULT null;--> statement-breakpoint
ALTER TABLE "teams" ALTER COLUMN "group_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ALTER COLUMN "category_id" SET DEFAULT null;