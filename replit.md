# Portfolio Web Application

## Overview

This is a modern full-stack portfolio web application built for Abdul Rasheed Talal, a Computer Information Technology student. The application features a React frontend with TypeScript, an Express.js backend, PostgreSQL database with Drizzle ORM, and includes a contact form with email notifications.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints
- **Development**: Hot module replacement with Vite integration
- **Email Service**: Nodemailer with Gmail SMTP

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Migrations**: Drizzle Kit for schema management
- **Schema Location**: Shared between frontend and backend in `/shared/schema.ts`

## Key Components

### Frontend Components
- **Portfolio Sections**: Hero, About, Skills, Projects, Education, Contact, Footer
- **Navigation**: Fixed navigation with smooth scrolling and active section tracking
- **Theme System**: Dark/light mode with system preference detection
- **Form Handling**: Contact form with validation using React Hook Form and Zod
- **Animations**: Intersection Observer for scroll-triggered animations
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Backend Services
- **Contact API**: `/api/contact` endpoint for form submissions
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Email Integration**: Automatic email notifications for contact form submissions
- **Error Handling**: Centralized error handling middleware
- **Development Tools**: Request logging and performance monitoring

### Database Schema
- **Users Table**: Basic user management (currently unused in portfolio)
- **Contact Messages Table**: Stores contact form submissions with timestamps
- **Type Safety**: Auto-generated TypeScript types from schema

## Data Flow

1. **Contact Form Submission**:
   - Client-side validation using Zod schema
   - Form data sent to `/api/contact` endpoint
   - Server validates and stores message in database
   - Email notification sent via Nodemailer
   - Success/error response returned to client

2. **Content Rendering**:
   - Static portfolio content rendered from components
   - Dynamic animations triggered by scroll position
   - Theme state managed in React context
   - Responsive behavior handled by Tailwind classes

## External Dependencies

### Frontend Dependencies
- **@radix-ui/***: Accessible UI primitives for complex components
- **@tanstack/react-query**: Server state management and caching
- **class-variance-authority**: Utility for creating component variants
- **clsx & tailwind-merge**: Class name utilities
- **date-fns**: Date manipulation utilities
- **wouter**: Lightweight client-side routing

### Backend Dependencies
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: PostgreSQL driver for Neon
- **nodemailer**: Email sending functionality
- **zod**: Runtime type validation
- **express**: Web application framework

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR
- **Database**: PostgreSQL connection via environment variables
- **Email**: Gmail SMTP with app-specific passwords
- **Environment Variables**: DATABASE_URL, EMAIL_USER, EMAIL_PASSWORD

### Production Build
- **Frontend**: Static files built to `dist/public`
- **Backend**: Bundled with esbuild to `dist/index.js`
- **Deployment**: Single server setup serving both API and static files
- **Database**: Managed PostgreSQL service (Neon recommended)

### Configuration
- **Build Scripts**: Separate dev, build, and start commands
- **Type Checking**: Shared TypeScript configuration
- **Asset Handling**: Vite handles frontend assets, Express serves in production
- **CORS**: Configured for same-origin deployment

The application follows a monorepo structure with shared types and utilities, making it easy to maintain consistency between frontend and backend while keeping the codebase organized and scalable.