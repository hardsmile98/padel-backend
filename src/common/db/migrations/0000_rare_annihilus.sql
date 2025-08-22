CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"login" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admins_login_unique" UNIQUE("login")
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"raiting" numeric DEFAULT null,
	"avatar_url" varchar(500) DEFAULT null,
	"photo_url" varchar(500) DEFAULT null,
	"description" jsonb DEFAULT 'null'::jsonb,
	CONSTRAINT "players_slug_unique" UNIQUE("slug")
);
