# My Dashboard

A modern, feature-rich dashboard application built with Next.js, React, and Supabase. This application provides a comprehensive interface for managing data connections, monitoring usage analytics, and handling various data processing tasks.

## Features

- 🔐 **Authentication & Authorization** - Secure user authentication powered by Supabase
- 🔌 **Multiple Data Connections** - Support for:
  - Dropbox
  - Google Drive
  - AWS S3
  - Snowflake
- 📊 **Analytics Dashboard**
  - Real-time usage metrics
  - API call monitoring
  - Data processing statistics
  - Performance analytics
- 📈 **Interactive Charts** - Beautiful data visualization using Recharts
- 🎯 **Project Management** - Create and manage multiple data projects
- 🏪 **Marketplace** - Browse pre-built templates and datasets
- 🎨 **Modern UI** - Built with Tailwind CSS and Radix UI components

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Supabase (PostgreSQL + Authentication)
- **Data Visualization**: Recharts
- **Cloud Storage**: AWS S3, Dropbox, Google Drive integrations
- **Data Warehouse**: Snowflake integration

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Supabase account
- Various API keys for integrations (AWS, Dropbox, Google Drive, Snowflake)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
my-dashboard/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable React components
│   ├── contexts/        # React context providers
│   ├── lib/             # Utility functions and API clients
│   └── types/           # TypeScript type definitions
├── public/              # Static files
└── supabase/           # Supabase configurations and migrations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
