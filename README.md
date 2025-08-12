# Barbershop Prestige - Polish Barbershop Website

A professional Polish barbershop website with appointment booking system built with React, TypeScript, Express.js, and Tailwind CSS.

## Features

- **Modern Design**: Professional Polish-language interface designed for barbershops
- **Appointment Booking**: Full-featured booking system with calendar and time slot management
- **Service Showcase**: Display services with pricing and duration
- **Team Profiles**: Showcase barber profiles and experience
- **Gallery**: Photo gallery of work and barbershop interior
- **Contact System**: Contact form and business information
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM (falls back to in-memory storage)
- **UI Components**: Radix UI with shadcn/ui styling
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation

## Deployment to Vercel

### Method 1: Direct from GitHub

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/barbershop-website.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration from `vercel.json`

### Method 2: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

## Environment Variables for Vercel

If you want to use a PostgreSQL database instead of in-memory storage:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add:
   ```
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=production
   ```

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Access the site**:
   - Frontend: http://localhost:5000
   - API: http://localhost:5000/api

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and configuration
│   │   └── hooks/        # Custom React hooks
├── server/                # Express.js backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage layer
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema and validation
├── api/                  # Vercel serverless functions
└── vercel.json          # Vercel deployment configuration
```

## API Endpoints

- `GET /api/services` - Get all services
- `GET /api/barbers` - Get all barbers
- `GET /api/availability/:barberId/:date` - Check barber availability
- `POST /api/appointments` - Create new appointment
- `POST /api/contact` - Send contact message

## Features in Detail

### Appointment Booking System
- Interactive calendar for date selection
- Real-time availability checking
- Time slot management with conflict prevention
- Form validation with Polish language messages
- Confirmation system

### Service Management
- Service pricing in Polish Złoty (PLN)
- Duration tracking
- Professional descriptions
- Icon-based categorization

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Fast loading times

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own barbershop or business.