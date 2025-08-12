import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Błąd podczas pobierania usług" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Usługa nie znaleziona" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Błąd podczas pobierania usługi" });
    }
  });

  // Barbers routes
  app.get("/api/barbers", async (req, res) => {
    try {
      const barbers = await storage.getBarbers();
      res.json(barbers);
    } catch (error) {
      res.status(500).json({ message: "Błąd podczas pobierania fryzjerów" });
    }
  });

  app.get("/api/barbers/:id", async (req, res) => {
    try {
      const barber = await storage.getBarber(req.params.id);
      if (!barber) {
        return res.status(404).json({ message: "Fryzjer nie znaleziony" });
      }
      res.json(barber);
    } catch (error) {
      res.status(500).json({ message: "Błąd podczas pobierania fryzjera" });
    }
  });

  // Appointments routes
  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Błąd podczas pobierania wizyt" });
    }
  });

  app.get("/api/appointments/date/:date", async (req, res) => {
    try {
      const appointments = await storage.getAppointmentsByDate(req.params.date);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Błąd podczas pobierania wizyt" });
    }
  });

  app.get("/api/availability/:barberId/:date", async (req, res) => {
    try {
      const { barberId, date } = req.params;
      const appointments = await storage.getAppointmentsByBarberAndDate(barberId, date);
      
      // Generate time slots from 9:00 to 17:00
      const timeSlots = [];
      for (let hour = 9; hour <= 17; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        const isAvailable = !appointments.some(app => app.time === time);
        timeSlots.push({
          time,
          available: isAvailable
        });
      }
      
      res.json(timeSlots);
    } catch (error) {
      res.status(500).json({ message: "Błąd podczas sprawdzania dostępności" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      
      // Check if time slot is available
      const isAvailable = await storage.isTimeSlotAvailable(
        validatedData.barberId,
        validatedData.date,
        validatedData.time
      );
      
      if (!isAvailable) {
        return res.status(400).json({ message: "Wybrany termin jest już zajęty" });
      }
      
      const appointment = await storage.createAppointment(validatedData);
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Nieprawidłowe dane",
          errors: error.errors.map(err => err.message)
        });
      }
      res.status(500).json({ message: "Błąd podczas tworzenia wizyty" });
    }
  });

  app.delete("/api/appointments/:id", async (req, res) => {
    try {
      const success = await storage.cancelAppointment(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Wizyta nie znaleziona" });
      }
      res.json({ message: "Wizyta została anulowana" });
    } catch (error) {
      res.status(500).json({ message: "Błąd podczas anulowania wizyty" });
    }
  });

  // Contact messages routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ 
        message: "Wiadomość została wysłana pomyślnie",
        data: message 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Nieprawidłowe dane",
          errors: error.errors.map(err => err.message)
        });
      }
      res.status(500).json({ message: "Błąd podczas wysyłania wiadomości" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
