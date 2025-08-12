import { type Service, type InsertService, type Barber, type InsertBarber, type Appointment, type InsertAppointment, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Services
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;

  // Barbers
  getBarbers(): Promise<Barber[]>;
  getBarber(id: string): Promise<Barber | undefined>;

  // Appointments
  getAppointments(): Promise<Appointment[]>;
  getAppointmentsByDate(date: string): Promise<Appointment[]>;
  getAppointmentsByBarberAndDate(barberId: string, date: string): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  cancelAppointment(id: string): Promise<boolean>;

  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

  // Availability
  isTimeSlotAvailable(barberId: string, date: string, time: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private services: Map<string, Service>;
  private barbers: Map<string, Barber>;
  private appointments: Map<string, Appointment>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.services = new Map();
    this.barbers = new Map();
    this.appointments = new Map();
    this.contactMessages = new Map();

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize services
    const servicesData: Service[] = [
      {
        id: "1",
        name: "Klasyczne Strzyżenie",
        description: "Profesjonalne strzyżenie dopasowane do Twojego stylu życia i kształtu twarzy.",
        price: 6000, // 60 zł
        duration: 45,
        icon: "fas fa-cut"
      },
      {
        id: "2",
        name: "Stylizacja Brody",
        description: "Precyzyjne przycinanie i stylizacja brody z użyciem najlepszych produktów.",
        price: 4500, // 45 zł
        duration: 30,
        icon: "fas fa-user-tie"
      },
      {
        id: "3",
        name: "Strzyżenie + Broda",
        description: "Kompletna usługa obejmująca strzyżenie włosów i stylizację brody.",
        price: 9000, // 90 zł
        duration: 75,
        icon: "fas fa-scissors"
      },
      {
        id: "4",
        name: "Pakiet Luksusowy",
        description: "Strzyżenie, broda, mycie włosów i masaż głowy. Pełen relaks i odświeżenie.",
        price: 12000, // 120 zł
        duration: 90,
        icon: "fas fa-crown"
      }
    ];

    servicesData.forEach(service => this.services.set(service.id, service));

    // Initialize barbers
    const barbersData: Barber[] = [
      {
        id: "1",
        name: "Mikołaj Kowalski",
        title: "Senior Barber & Właściciel",
        experience: "15 lat doświadczenia, specjalista od klasycznych strzyżeń i stylizacji brody.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        id: "2",
        name: "Adam Nowak",
        title: "Master Stylista",
        experience: "10 lat doświadczenia, ekspert w nowoczesnych trendach i stylizacji dla młodych mężczyzn.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      },
      {
        id: "3",
        name: "Tomasz Wiśniewski",
        title: "Professional Barber",
        experience: "8 lat doświadczenia, specjalista od precyzyjnych strzyżeń i tradycyjnych technik.",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      }
    ];

    barbersData.forEach(barber => this.barbers.set(barber.id, barber));

    // Add some sample appointments to demonstrate occupied time slots
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const sampleAppointments: Appointment[] = [
      {
        id: "1",
        serviceId: "1",
        barberId: "1",
        date: tomorrowStr,
        time: "11:00",
        firstName: "Jan",
        phone: "+48123456789",
        email: "jan@example.com",
        status: "confirmed",
        createdAt: new Date()
      },
      {
        id: "2",
        serviceId: "2",
        barberId: "1",
        date: tomorrowStr,
        time: "13:00",
        firstName: "Piotr",
        phone: "+48987654321",
        status: "confirmed",
        createdAt: new Date()
      }
    ];

    sampleAppointments.forEach(appointment => this.appointments.set(appointment.id, appointment));
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getBarbers(): Promise<Barber[]> {
    return Array.from(this.barbers.values());
  }

  async getBarber(id: string): Promise<Barber | undefined> {
    return this.barbers.get(id);
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.date === date && appointment.status === "confirmed"
    );
  }

  async getAppointmentsByBarberAndDate(barberId: string, date: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.barberId === barberId && appointment.date === date && appointment.status === "confirmed"
    );
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const appointment: Appointment = {
      ...insertAppointment,
      id,
      status: "confirmed",
      createdAt: new Date()
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async cancelAppointment(id: string): Promise<boolean> {
    const appointment = this.appointments.get(id);
    if (appointment) {
      appointment.status = "cancelled";
      return true;
    }
    return false;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async isTimeSlotAvailable(barberId: string, date: string, time: string): Promise<boolean> {
    const appointments = await this.getAppointmentsByBarberAndDate(barberId, date);
    return !appointments.some(appointment => appointment.time === time);
  }
}

export const storage = new MemStorage();
