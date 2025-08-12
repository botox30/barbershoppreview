import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in grosze (cents)
  duration: integer("duration").notNull(), // in minutes
  icon: text("icon").notNull(),
});

export const barbers = pgTable("barbers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  experience: text("experience").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  serviceId: varchar("service_id").notNull().references(() => services.id),
  barberId: varchar("barber_id").notNull().references(() => barbers.id),
  date: text("date").notNull(), // YYYY-MM-DD format
  time: text("time").notNull(), // HH:MM format
  firstName: text("first_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  status: text("status").notNull().default("confirmed"), // confirmed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertBarberSchema = createInsertSchema(barbers).omit({
  id: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
}).extend({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data musi być w formacie YYYY-MM-DD"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Godzina musi być w formacie HH:MM"),
  firstName: z.string().min(2, "Imię musi mieć przynajmniej 2 znaki"),
  phone: z.string().min(9, "Numer telefonu musi mieć przynajmniej 9 cyfr"),
  email: z.string().email("Nieprawidłowy adres email").optional(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
}).extend({
  firstName: z.string().min(2, "Imię musi mieć przynajmniej 2 znaki"),
  lastName: z.string().min(2, "Nazwisko musi mieć przynajmniej 2 znaki"),
  email: z.string().email("Nieprawidłowy adres email"),
  phone: z.string().min(9, "Numer telefonu musi mieć przynajmniej 9 cyfr"),
  message: z.string().min(10, "Wiadomość musi mieć przynajmniej 10 znaków"),
});

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Barber = typeof barbers.$inferSelect;
export type InsertBarber = z.infer<typeof insertBarberSchema>;
export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
