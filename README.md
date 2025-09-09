Caye Cruiser ........test
This is the repository for the Caye Cruiser project, a ride-sharing and golf cart rental service for San Pedro, Ambergris Caye, Belize.

Technologies Used

This project is built with a modern tech stack:

Frontend:
    -   Vite
    -   React
    -   TypeScript
    -   Tailwind CSS
    -   shadcn/ui
Backend:
    -   Supabase (Authentication, Database, Serverless Functions)
Payments:
    -   Stripe

Getting Started

To get a local copy up and running, follow these simple steps.

Prerequisites

You'll need to have [Node.js](https://nodejs.org/) installed on your machine. I recommend using [nvm](https://github.com/nvm-sh/nvminstalling-and-updating) to manage your Node.js versions.

Installation

1.  Clone the repo
    
    git clone <https://github.com/alexkinnunen/caye-cruiser-vibes.git>
    
2.  Navigate to the project directory
    
    cd caye-cruiser-vibes
    
3.  Install NPM packages
    
    npm install
    
4.  Set up your environment variables

    Create a `.env` file in the root of the project and add the following variables:

    
    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
    VITE_SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_PUBLISHABLE_KEY"
    VITE_MAPBOX_TOKEN="YOUR_MAPBOX_TOKEN"
    VITE_WHATSAPP_NUMBER="YOUR_WHATSAPP_NUMBER"
    

5.  Start the development server
    
    npm run dev
    

    The application will be available at `http://localhost:5173`.

Supabase Setup

This project uses Supabase for the backend. To get started, you'll need to create a new project on [Supabase](https://supabase.com/) and then set up the database schema using the provided migration file.

You can find the database migration file in `supabase/migrations/`.

Deployment

You can deploy this project to any modern hosting provider that supports Node.js, such as Vercel, Netlify, or your own server.