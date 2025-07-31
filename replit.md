# Cafe Bluez Dashboard - Full-Stack Application

## Overview

This is a full-stack React application built with Express.js backend that provides a comprehensive dashboard for cafe management. The application fetches real-time data from Google Sheets to display sales, inventory, attendance, and feedback analytics with an integrated chatbot assistant.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with a dark theme optimized for cafe/dashboard use
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Charts**: Recharts for data visualization
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development**: Hot reloading with Vite integration in development mode
- **Static Serving**: Express serves the built React app in production
- **Logging**: Custom request/response logging middleware

### Data Layer
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema**: Shared schema definitions between client and server
- **Data Source**: Webhook integration with fallback to Google Sheets for real-time data fetching
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Migration Status**: Successfully migrated from Lovable to Replit (2025-07-31)

## Key Components

### Frontend Components
- **Dashboard Sections**: Modular components for sales, inventory, attendance, and feedback
- **Real-time Charts**: Sales trends and item performance visualization
- **Live Data Tables**: Recent transactions and staff attendance
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Backend Components
- **Route Registration**: Centralized route management system
- **Storage Abstraction**: Interface-based storage layer for easy database switching
- **Error Handling**: Global error handling middleware
- **Development Tools**: Vite integration for seamless full-stack development

### Shared Components
- **Schema Definitions**: Type-safe database schemas with Zod validation
- **Type Definitions**: Shared TypeScript interfaces for cafe data structures

## Data Flow

1. **Webhook Integration**: Primary data source from `http://localhost:5678/webhook-test/sheetaccess`
2. **Google Sheets Fallback**: Falls back to Google Sheets CSV export URLs if webhook unavailable
3. **Real-time Updates**: Data refreshes every 60 seconds automatically
4. **Client-side Processing**: Raw data is parsed and transformed into typed TypeScript objects
5. **State Management**: TanStack Query manages caching, background updates, and error states
6. **Component Rendering**: Dashboard components receive typed data and render charts/tables
7. **User Interactions**: Clean dashboard interface for viewing real-time cafe management data

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Query for frontend
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns for date manipulation and formatting
- **CSV Parsing**: PapaParse for Google Sheets data processing

### Backend Dependencies
- **Express.js**: Web server framework
- **Drizzle ORM**: Type-safe database ORM
- **Neon Database**: Serverless PostgreSQL driver
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds

### Development Dependencies
- **Build Tools**: Vite for frontend bundling, esbuild for backend bundling
- **TypeScript**: Full TypeScript support across the stack
- **Development Plugins**: Replit-specific plugins for enhanced development experience

## Deployment Strategy

### Development Mode
- **Frontend**: Vite dev server with HMR (Hot Module Replacement)
- **Backend**: tsx for TypeScript execution with file watching
- **Integration**: Vite middleware integration with Express for seamless full-stack development

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild compiles TypeScript server code to `dist/index.js`
- **Serving**: Express serves static files and API routes from single server instance
- **Database**: Drizzle migrations can be run with `npm run db:push`

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection
- **Google Sheets**: Uses public sheet ID for data fetching (no authentication required)
- **Replit Integration**: Special handling for Replit environment with development banners and cartographer

The application is designed to be easily deployable on various platforms while maintaining a clean separation between development and production concerns.