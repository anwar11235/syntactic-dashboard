# Dependencies Overview

This document provides a detailed overview of all dependencies used in the My Dashboard application.

## Production Dependencies

```json
{
  "@aws-sdk/client-s3": "^3.525.0",      // AWS S3 client for S3 integration
  "@radix-ui/react-avatar": "^1.1.2",    // Avatar component from Radix UI
  "@radix-ui/react-dialog": "^1.1.4",    // Dialog component from Radix UI
  "@radix-ui/react-icons": "^1.3.2",     // Icon set from Radix UI
  "@radix-ui/react-label": "^2.1.1",     // Label component from Radix UI
  "@radix-ui/react-slot": "^1.1.1",      // Slot component from Radix UI
  "@radix-ui/react-switch": "^1.1.2",    // Switch component from Radix UI
  "@radix-ui/react-tabs": "^1.1.2",      // Tabs component from Radix UI
  "@supabase/supabase-js": "^2.47.10",   // Supabase client for backend integration
  "class-variance-authority": "^0.7.1",   // Utility for component variants
  "clsx": "^2.1.1",                      // Utility for conditional CSS classes
  "dropbox": "^10.34.0",                 // Dropbox SDK for integration
  "lucide-react": "^0.469.0",            // Icon library
  "next": "14.0.4",                      // Next.js framework
  "react": "^18.2.0",                    // React library
  "react-dom": "^18.2.0",                // React DOM
  "recharts": "^2.15.0",                 // Charting library
  "sonner": "^1.7.1",                    // Toast notifications
  "tailwind-merge": "^2.6.0",            // Tailwind CSS class merging utility
  "tailwindcss-animate": "^1.0.7"        // Animation utilities for Tailwind CSS
}
```

## Development Dependencies

```json
{
  "@types/node": "^20",                  // TypeScript definitions for Node.js
  "@types/react": "^18",                 // TypeScript definitions for React
  "@types/react-dom": "^18",             // TypeScript definitions for React DOM
  "@types/snowflake-sdk": "^1.6.24",     // TypeScript definitions for Snowflake SDK
  "@typescript-eslint/eslint-plugin": "^6.21.0",  // ESLint plugin for TypeScript
  "@typescript-eslint/parser": "^6.21.0", // TypeScript parser for ESLint
  "autoprefixer": "^10.0.1",             // PostCSS plugin for vendor prefixes
  "eslint": "^8.56.0",                   // JavaScript linter
  "eslint-config-next": "14.0.4",        // ESLint configuration for Next.js
  "postcss": "^8",                       // CSS post-processor
  "tailwindcss": "^3.4.1",               // Utility-first CSS framework
  "typescript": "^5"                      // TypeScript compiler
}
```

## Key Features of Dependencies

### Frontend Framework
- **Next.js**: Server-side rendering, routing, and development environment
- **React**: UI component library
- **TypeScript**: Type safety and better developer experience

### UI Components and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon set
- **Recharts**: Responsive charting library

### Backend and Data
- **Supabase**: Backend as a service (BaaS)
- **AWS SDK**: AWS S3 integration
- **Dropbox SDK**: Dropbox integration

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## Version Management

All dependencies use semantic versioning (SemVer) to ensure compatibility:
- `^` indicates compatibility with future minor/patch versions
- Exact versions are used for critical dependencies like Next.js

## Adding New Dependencies

When adding new dependencies, consider:
1. Bundle size impact
2. Maintenance status
3. Community support
4. Security implications
5. License compatibility

## Updating Dependencies

Regular updates are recommended for security and features:
```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update a specific package
npm update package-name
``` 