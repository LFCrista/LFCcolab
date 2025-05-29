CREATE TYPE "public"."activities_status" AS ENUM('pending', 'in_progress', 'completed', 'late', 'out_of_date');--> statement-breakpoint
CREATE TABLE "activities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"archives_activity_url" text,
	"archives_answer_url" text,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"finished" boolean DEFAULT false,
	"finished_date" timestamp,
	"note_answer" text,
	"downloaded" boolean DEFAULT false,
	"justification" text,
	"status" "activities_status" DEFAULT 'pending',
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;