# AI Patent Analyzer - Frontend

A modern, professional SaaS frontend for patent analysis and research powered by AI.

## Features

- **Landing Page**: Hero section with features showcase and CTA
- **Login Page**: Secure authentication UI with social login options
- **Dashboard**: Patent upload/search interface with similarity detection
- **Patent Overview**: Detailed patent analysis view with AI chatbox

## Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx          # Home page
│   │   ├── Login.jsx            # Authentication page
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   └── PatentOverview.jsx   # Patent details page
│   ├── App.jsx                  # App router
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── postcss.config.js           # PostCSS configuration
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm run preview
```

## Design System

### Colors
- **Primary Blue**: `#1e40af` to `#3b82f6` (gradient)
- **Background**: `#f8fafc` to `#e0f2fe` (light blue)
- **Text**: `#111827` (dark gray)

### Components
- Cards with rounded corners and subtle shadows
- Blue gradient buttons with hover effects
- Input fields with focus states
- Professional spacing and typography

## Pages Overview

### Landing Page
- Hero section with gradient background
- Feature cards (AI Analysis, Similarity Detection, Innovation Insights)
- Call-to-action buttons
- Footer with links

### Login Page
- Centered card layout
- Email and password inputs
- Remember me and forgot password options
- Social login buttons (Google, GitHub)
- Sign up link

### Dashboard
- Header with account menu
- Two-column layout:
  - Left: PDF upload and text area
  - Right: Keyword search with similarity threshold slider
- Recent analysis cards
- Alert notifications

### Patent Overview
- Detailed patent information
- Key details and dates section
- Top concepts tags
- AI Chatbox for Q&A
- Similar patents section
- Analysis dashboard button

## Notes

- **No Backend**: This is a frontend-only UI. All data is static/mock.
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Professional SaaS Look**: Enterprise-grade design with modern aesthetics
- **Accessibility**: Semantic HTML and proper contrast ratios

## Future Enhancements

- Backend API integration
- User authentication
- Patent database connection
- Real AI analysis
- Export features
- Dark mode
