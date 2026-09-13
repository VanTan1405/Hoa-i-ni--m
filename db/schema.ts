
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const authUsers=sqliteTable("auth_users",{id:text("id").primaryKey(),username:text("username").notNull().unique(),name:text("name").notNull(),email:text("email").notNull().default(""),passwordHash:text("password_hash").notNull(),status:text("status").notNull().default("pending"),createdAt:text("created_at").notNull()});
export const secureConfig=sqliteTable("secure_config",{key:text("key").primaryKey(),value:text("value").notNull()});
export const rateLimits=sqliteTable("rate_limits",{key:text("key").primaryKey(),count:integer("count").notNull(),expires:integer("expires").notNull()});
export const oauthStates=sqliteTable("oauth_states",{id:text("id").primaryKey(),verifier:text("verifier").notNull(),expires:integer("expires").notNull()});
