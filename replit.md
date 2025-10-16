# Overview

Where is a cross-platform mobile application built with React Native and Expo that enables users to discover, share, and rate locations worldwide. The app provides a transparent, community-driven platform for location insights with features including interactive maps, user-generated ratings, image sharing, comments, and a points-based engagement system. The application leverages decentralized storage (Sia/S5) for storing user-uploaded images and uses Supabase for authentication.

## Recent Changes (October 2025)

**Replit Environment Setup:**
- Updated all Expo SDK 53 packages to match doctor requirements
- Configured NativeWind v4 with Tailwind CSS v3.4.17
- Fixed route naming: renamed `+notfound.tsx` to `+not-found.tsx`
- Corrected route references in profile screens from `/my-locations` to `/my-location` and `/settings` to `/setting`
- Installed Watchman to resolve Metro bundler file watching issues
- Configured Metro to exclude unnecessary directories from watching
- Set up Expo web workflow on port 5000 for Replit environment
- Configured deployment for autoscale with proper build and run commands

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Technology Stack:**
- React Native with Expo SDK 53 for cross-platform mobile development (iOS, Android, Web)
- Expo Router for file-based navigation
- NativeWind for Tailwind CSS styling in React Native
- TypeScript for type safety

**State Management:**
- Zustand with persistence (AsyncStorage) for all application state
- Separate stores for auth, locations, points, referrals, and theme
- No external database - all data persisted locally in stores

**Key Design Decisions:**
- File-based routing with tab navigation (Map, Search, Profile)
- Platform-specific implementations (MapView has separate .native.tsx and .web.tsx versions)
- Onboarding flow: onboarding → splash → welcome → main app
- Support for both authenticated users and guest/anonymous users
- Multi-language support via i18next (currently English only)

## Authentication & Authorization

**Provider:** Supabase Auth
- OAuth with Google (configured via Google Cloud Console)
- Farcaster login (web only)
- Email/password authentication
- Guest/anonymous mode support
- Session management with access tokens

**User Model:**
- Supports multiple auth providers: email, Google, Farcaster, guest
- Anonymous posting capability
- Profile images stored on S5
- Points-based gamification system

## Core Features & Data Models

**Locations:**
- User-generated locations with lat/long coordinates
- Multi-category rating system (security, violence, welcoming, street food, restaurants, pickpocketing, quality of life, safety concerns)
- Image galleries with like functionality
- Comments with anonymous option
- Verification system by contributors
- All data stored in local Zustand store (locations-store)

**Points & Engagement:**
- Activity tracking for various actions (create location, add image, verify, rate, comment)
- Point distribution to contributors when locations receive engagement
- Image likes tracked separately
- Referral rewards system

**Referrals:**
- User-generated referral codes (format: WHERE-XXXXXXXX)
- Tracking of referral relationships
- Referral count displayed in user profiles

## Storage & Media

**Decentralized Storage:**
- Sia network via S5 for image storage
- Upload endpoint proxied through backend at /s5/upload
- Retry queue for failed uploads (stored in AsyncStorage)
- 50MB file size limit
- Support for multiple image/video formats
- Gateway URL generation for content access

**Upload Flow:**
1. Mobile: ImagePicker → local URI
2. Convert to FormData blob
3. POST to backend /s5/upload endpoint
4. Backend forwards to S5 with admin API key
5. Returns CID and gateway URL
6. Store gateway URL in location/user data

## Backend Architecture

**Technology:** Hono (lightweight Node.js framework)
- Hosted on Render (https://where-1.onrender.com)
- tRPC for type-safe API communication (currently minimal usage)
- CORS enabled for cross-origin requests
- S5 upload proxy endpoint with authentication

**API Structure:**
- `/api/trpc/*` - tRPC endpoints (placeholder example route exists)
- `/s5/upload` - S5 storage proxy with admin key authentication

**Context & Type Safety:**
- tRPC context creation with request object
- SuperJSON transformer for data serialization
- Zod schemas for input validation
- Shared type definitions between frontend and backend

## External Dependencies

**Third-Party Services:**
- Supabase (https://otbvkfzpcxzrcikwysrk.supabase.co)
  - Authentication (email, OAuth, social logins)
  - User management
  - API keys stored in auth-store

- Sia/S5 Network
  - Decentralized file storage
  - Admin API key: HvFNPSxB8h4dRPLM7bti9NnqzJfqboj9G792bLBmGzLR
  - Base URL: http://where-app.com (configurable via env)

- Google Cloud Console
  - OAuth client for Google sign-in
  - Configured in Supabase Auth providers

**Key NPM Packages:**
- @tanstack/react-query - Server state management
- expo-location - Geolocation services
- expo-image-picker - Media selection
- react-native-maps - Native map component
- leaflet/react-leaflet - Web map fallback
- lucide-react-native - Icon library

**Map Implementation:**
- Native: react-native-maps (iOS/Android)
- Web: Leaflet with OpenStreetMap tiles
- Platform-specific components with shared interface
- User location tracking with permission handling

**Internationalization:**
- i18next for translations
- React-i18next for React integration
- Currently only English translations implemented
- Translation keys defined in app/i18n.ts