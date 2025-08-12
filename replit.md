# Overview

This is a modern barbershop booking website built as a full-stack web application. The project provides an online platform for a premium barbershop called "Barbershop Prestige" where customers can browse services, view the gallery, learn about barbers, book appointments, and contact the business. The application features a professional Polish-language interface with a focus on user experience and modern design.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with a custom design system using CSS variables for theming
- **UI Components**: Comprehensive component library built on Radix UI primitives with shadcn/ui styling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Server**: Express.js with TypeScript providing RESTful API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL support for type-safe database operations
- **Storage Pattern**: Repository pattern with both in-memory storage for development and database support
- **Request Validation**: Zod schemas shared between frontend and backend for consistent validation
- **Development**: Hot module replacement and error overlay integration for enhanced developer experience

## API Design
The backend exposes several REST endpoints:
- `/api/services` - Service management (GET endpoints)
- `/api/barbers` - Barber information (GET endpoints)  
- `/api/appointments` - Appointment booking and management
- `/api/contact` - Contact form submissions
- `/api/availability` - Real-time availability checking

## Data Models
- **Services**: Service offerings with pricing, duration, and descriptions
- **Barbers**: Staff profiles with experience and specialties
- **Appointments**: Booking records linking customers, services, and barbers
- **Contact Messages**: Customer inquiries and feedback

## Database Schema
Uses PostgreSQL with Drizzle ORM defining:
- UUID primary keys for all entities
- Foreign key relationships between appointments, services, and barbers
- Timestamp tracking for appointments and messages
- Text fields for names, descriptions, and contact information

## Development Workflow
- **Type Safety**: Shared TypeScript interfaces and Zod schemas between client and server
- **Hot Reloading**: Vite development server with Express middleware integration
- **Database Migrations**: Drizzle Kit for schema management and migrations
- **Path Aliases**: Configured import aliases for clean code organization

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL database via `@neondatabase/serverless`
- **Connection**: Uses DATABASE_URL environment variable for database connectivity

## UI Framework
- **Radix UI**: Comprehensive set of accessible UI primitives for components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static typing for both client and server code
- **ESBuild**: Fast bundling for production builds

## Form and Validation
- **React Hook Form**: Performance-focused form handling
- **Zod**: Runtime type validation and schema definition
- **@hookform/resolvers**: Integration between React Hook Form and Zod

## State Management
- **TanStack Query**: Server state management, caching, and synchronization
- **React Query**: Provides optimistic updates and background refetching

## Fonts and Assets
- **Google Fonts**: Multiple font families including Poppins and Inter
- **Unsplash**: High-quality stock photography for gallery and hero sections

## Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **Express Session**: Server-side session management

## Development Environment
- **Replit Integration**: Custom plugins for Replit-specific development features
- **Runtime Error Modal**: Enhanced error reporting during development