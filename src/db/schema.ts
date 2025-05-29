import { relations } from "drizzle-orm";
import { boolean } from "drizzle-orm/pg-core"; // ✅ para PostgreSQL
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const adminsTable = pgTable("admins", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
  activities: many(activitiesTable),
}));

export const activitiesStatusEnum = pgEnum("activities_status", [
  "pending",
  "in_progress",
  "completed",
  "late",
  "out_of_date",
]);

export const activitiesTable = pgTable("activities", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  archivesActivityUrl: text("archives_activity_url"),
  archivesAnswerUrl: text("archives_answer_url"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  finished: boolean("finished").default(false),
  finishedDate: timestamp("finished_date"),
  noteAnswer: text("note_answer"),
  downloaded: boolean("downloaded").default(false),
  justification: text("justification"),
  status: activitiesStatusEnum("status").default("pending"),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const activitiesTableRelations = relations(
  activitiesTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [activitiesTable.userId],
      references: [usersTable.id],
    }),
  }),
);
