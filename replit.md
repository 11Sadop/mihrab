# محراب - Islamic Companion App

## Overview

محراب (Mihrab) is a comprehensive Arabic-only Islamic companion mobile-first PWA application built with React and Express. The app provides Muslims with essential daily spiritual tools including prayer times with iqama countdown, adhkar (remembrances), duas (supplications), daily hadiths, a digital tasbeeh counter, hadith verification database, Qibla compass, and Zakat calculator. The application is fully Arabic with right-to-left (RTL) text rendering.

## User Preferences

Preferred communication style: Simple, everyday language (Arabic).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, localStorage for client-side persistence
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Development**: Hot module replacement via Vite middleware in development mode

### Data Layer
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema**: Defined in `shared/schema.ts` using Drizzle's pgTable definitions
- **Tables**: adhkar, duas, hadiths, benefits, quranSurahs, reciters, dailyWard, verifiedHadiths
- **Migrations**: Managed via drizzle-kit with `db:push` command

### Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Database table definitions and TypeScript types
- `routes.ts`: API route definitions with Zod schemas for type-safe API contracts

### Key Design Decisions

1. **Monorepo Structure**: Client code in `client/`, server in `server/`, shared types in `shared/` - enables type sharing between frontend and backend

2. **Prayer Times API**: Fetched from external Aladhan API on client-side to support location-based prayer times without backend proxy

3. **Local Storage for User Preferences**: Tasbeeh counts, settings, and user location stored in browser localStorage for offline persistence

4. **Arabic Text Support**: Custom font loading (Amiri for Arabic, Plus Jakarta Sans for UI) with RTL text alignment for Arabic content

5. **Mobile-First Design**: Bottom navigation bar, touch-friendly UI elements, safe area padding for mobile devices

6. **Hadith Verification**: Large database of verified hadiths with grades (صحيح، حسن، ضعيف، موضوع) from trusted sources

## External Dependencies

### Third-Party APIs
- **Aladhan API**: Prayer times calculation based on user location (called from client-side)

### Database
- **PostgreSQL**: Primary data store, requires DATABASE_URL environment variable
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI Component Library
- **shadcn/ui**: Pre-built accessible React components using Radix UI primitives
- **Radix UI**: Headless UI primitives (dialog, dropdown, tabs, etc.)

### Key NPM Packages
- **drizzle-orm / drizzle-kit**: Database ORM and migration tooling
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for smooth transitions
- **date-fns**: Date/time formatting utilities
- **zod**: Runtime type validation for API contracts
- **wouter**: Lightweight client-side routing

## Deployment

### Production URL
- **Domain**: https://mihrabapp.com
- **Vercel**: https://mihrab-app-peach.vercel.app
- **Deploy Hook**: https://api.vercel.com/v1/integrations/deploy/prj_xMI1XqXN0W3aXcpNKRpYNqYMxmEZ/MSqP4oU0qV?buildCache=false

### Service Worker Cache
- Current version: v62 (mihrab-app-v62)
- Bump version in `client/public/sw.js` when deploying UI changes

### Admin Pages
- **Stats Page**: https://mihrabapp.com/admin/stats?key=mihrab2024

## Recent Updates (December 30, 2025)
- Added internal page visit tracking and admin stats page
- Added multi-currency Zakat calculator with 16 currencies
- Gold/Silver prices from live API (api.gold-api.com)
- Fixed iOS Safari white screen crash - added feature detection for Notification API
- Fixed Service Worker crash on iOS - guard all notification calls with platform checks
- Skip notification scheduling on platforms that don't support web notifications (iOS Safari)
- Improved error handling with ErrorBoundary showing actual error messages

## Previous Updates (December 29, 2025)
- Added Moyasar payment gateway for Saudi donations (supports مدى, Apple Pay, STC Pay)
- Updated production domain to mihrabapp.com
- Fixed mobile white screen: Now shows loading while requesting GPS location
- Service Worker cache version updated to v50
