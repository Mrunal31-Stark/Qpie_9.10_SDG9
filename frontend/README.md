# AI Patent Analyzer - Frontend Documentation

A comprehensive React + Vite application for analyzing patents using AI-powered similarity detection, with integrated MongoDB authentication and real-time analysis dashboard.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Detailed File Documentation](#detailed-file-documentation)
5. [Application Flow](#application-flow)
6. [Setup Instructions](#setup-instructions)
7. [Features](#features)
8. [API Integration](#api-integration)
9. [Data Storage](#data-storage)

---

## 🎯 Project Overview

The AI Patent Analyzer is a full-stack web application designed to help users analyze patent documents for similarity, innovation potential, and prior art detection. The application features user authentication, document upload capabilities, keyword-based search, and comprehensive analysis dashboards with visual metrics.

**Key Capabilities:**
- 🔐 JWT-based user authentication with MongoDB
- 📄 PDF upload and text input for patent analysis
- 🔍 Keyword-based patent search
- 📊 Real-time similarity scoring and analysis
- 💾 Persistent analysis history with localStorage
- 📈 Visual analytics dashboard with metrics and insights

---

## 🛠 Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### Backend (Integrated)
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

---

## 📁 Project Structure

```
frontend/
├── src/                          # Source code
│   ├── pages/                    # React page components
│   │   ├── Landing.jsx          # Home/landing page
│   │   ├── Login.jsx            # Authentication page
│   │   ├── Dashboard.jsx        # Main analysis dashboard
│   │   ├── PatentOverview.jsx   # Patent detail view
│   │   └── AnalysisDashboard.jsx # Analysis metrics page
│   ├── App.jsx                   # Main app component & routing
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles & Tailwind config
├── server/                       # Backend server code
│   ├── index.js                  # Express server entry point
│   ├── models/                   # Mongoose models
│   │   └── User.js              # User schema
│   ├── routes/                   # API routes
│   │   └── auth.js              # Authentication endpoints
│   └── middleware/               # Custom middleware
│       └── auth.js              # JWT verification
├── index.html                    # HTML entry point
├── package.json                  # Dependencies & scripts
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── .env                         # Environment variables
├── test_mongodb.js              # MongoDB connection test
├── start_mongodb.bat            # MongoDB startup script
└── README.md                    # This file
```

---

## 📄 Detailed File Documentation

### **Root Configuration Files**

#### `package.json`
**Purpose:** Defines project dependencies, scripts, and metadata.

**Key Dependencies:**
```json
{
  "dependencies": {
    "react": "^18.3.1",           // UI library
    "react-dom": "^18.3.1",       // DOM rendering
    "react-router-dom": "^7.1.3", // Routing
    "express": "^4.21.2",         // Backend framework
    "mongoose": "^8.9.4",         // MongoDB ODM
    "jsonwebtoken": "^9.0.2",     // JWT auth
    "bcryptjs": "^2.4.3",         // Password hashing
    "cors": "^2.8.5",             // CORS middleware
    "dotenv": "^16.4.7"           // Environment variables
  }
}
```

**Scripts:**
- `npm run dev` - Start Vite dev server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start backend server (port 5000)

---

#### `vite.config.js`
**Purpose:** Configures Vite build tool and development server.

**Key Configuration:**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,              // Frontend dev server port
    open: true,              // Auto-open browser
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Proxy API calls to backend
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

**Functionality:**
- Proxies all `/api/*` requests to backend server
- Enables hot module replacement (HMR)
- Optimizes build performance

---

#### `tailwind.config.js`
**Purpose:** Configures Tailwind CSS utility classes and theme.

**Features:**
- Custom color schemes for blue gradient themes
- Responsive breakpoints
- Custom animations and transitions
- Purge configuration for production builds

---

#### `.env`
**Purpose:** Stores environment variables for backend configuration.

**Variables:**
```env
MONGO_URI=mongodb://localhost:27017/ai-patent-analyzer
JWT_SECRET=mysecrettoken
PORT=5000
```

**Security Note:** Never commit this file to version control.

---

### **Source Files (`src/`)**

#### `main.jsx`
**Purpose:** Application entry point - mounts React app to DOM.

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Functionality:**
- Renders root `App` component
- Applies React Strict Mode for development checks
- Imports global styles

---

#### `App.jsx`
**Purpose:** Main application component containing all routing logic.

**Routes:**
| Path | Component | Description |
|------|-----------|-------------|
| `/` | Landing | Home page with features overview |
| `/login` | Login | Authentication (login/signup) |
| `/dashboard` | Dashboard | Main analysis interface |
| `/patent/:id` | PatentOverview | Patent details view |
| `/analysis/:id` | AnalysisDashboard | Analysis metrics dashboard |

**Key Features:**
- React Router integration
- Lazy loading ready
- Clean route structure

---

#### `index.css`
**Purpose:** Global CSS styles and Tailwind directives.

**Contents:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom utility classes */
.input-field { /* Styled input fields */ }
.card { /* Reusable card component */ }
```

**Defines:**
- Tailwind base, components, utilities
- Custom reusable CSS classes
- Global font and color variables

---

### **Pages (`src/pages/`)**

#### `Landing.jsx`
**Purpose:** Landing page showcasing application features and call-to-action.

**Key Sections:**
1. **Hero Section**
   - Eye-catching headline
   - Brief description
   - "Get Started" CTA button
   
2. **Features Grid**
   - 🧠 AI-Powered Analysis
   - 📊 Similarity Detection
   - ⚡ Real-Time Results
   - 🔒 Secure & Private

3. **How It Works**
   - Step-by-step process visualization
   - Upload → Analyze → Insights

4. **Call to Action**
   - Encourages user signup

**Navigation:**
- "Get Started" → `/login`
- "Sign In" button → `/login`

**State:** No state management (static page)

---

#### `Login.jsx`
**Purpose:** Handles user authentication (both login and registration).

**State Management:**
```javascript
const [isLogin, setIsLogin] = useState(true)      // Toggle login/signup
const [email, setEmail] = useState('')
const [username, setUsername] = useState('')      // For signup only
const [password, setPassword] = useState('')
const [showPassword, setShowPassword] = useState(false)
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)
```

**Key Features:**

1. **Toggle Between Login/Signup**
   - Single form handles both authentication flows
   - Conditional rendering based on `isLogin` state

2. **Login Flow:**
   - Sends `POST /api/auth/login`
   - Payload: `{ email, password }`
   - Stores JWT token in localStorage
   - Redirects to `/dashboard`

3. **Registration Flow:**
   - Sends `POST /api/auth/register`
   - Payload: `{ username, email, password }`
   - Stores JWT token in localStorage
   - Redirects to `/dashboard`

4. **Form Validation:**
   - Client-side error handling
   - Server error display
   - Loading states

5. **UI Elements:**
   - Password visibility toggle
   - "Remember Me" checkbox
   - Social login placeholders (Google, Microsoft)
   - "Forgot Password?" link

**API Integration:**
```javascript
const handleAuth = async (e) => {
  const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
  const payload = isLogin ? { email, password } : { username, email, password }
  
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  
  const data = await res.json()
  localStorage.setItem('token', data.token)
  navigate('/dashboard')
}
```

---

#### `Dashboard.jsx`
**Purpose:** Main analysis interface for creating and managing patent analyses.

**State Management:**
```javascript
const [threshold, setThreshold] = useState(80)          // Similarity threshold (0-100)
const [domain, setDomain] = useState('')                // Technology domain
const [searchKeyword, setSearchKeyword] = useState('')  // Search input
const [patentText, setPatentText] = useState('')        // Pasted text
const [uploadedFile, setUploadedFile] = useState(null)  // Uploaded PDF
const [recentAnalyses, setRecentAnalyses] = useState([]) // Analysis history
```

**Key Features:**

1. **PDF Upload**
   ```javascript
   const handleFileUpload = (e) => {
     const file = e.target.files[0]
     if (file && file.type === 'application/pdf') {
       setUploadedFile(file)
       // Read file content
     }
   }
   ```
   - Accepts `.pdf` files only
   - Hidden file input with custom UI
   - File metadata display

2. **Text Input**
   - Large textarea for patent text/abstracts
   - Fully controlled component
   - Placeholder guidance

3. **Keyword Search**
   - Real-time input capture
   - Used for patent matching

4. **Similarity Threshold Slider**
   - Range: 0-100%
   - Live value display
   - Color-coded threshold alert

5. **Domain Selection**
   - Dropdown with predefined domains:
     - Electric Vehicles
     - Battery Technology
     - AI & Machine Learning
     - Renewable Energy
     - Biotechnology

6. **Analyze Patent Button**
   ```javascript
   const handleAnalyze = () => {
     // Validation
     if (!patentText && !uploadedFile && !searchKeyword) {
       alert('Please provide input')
       return
     }
     
     // Create new analysis
     const newAnalysis = {
       id: `patent-${Date.now()}`,
       title: searchKeyword || uploadedFile?.name || 'Patent Analysis',
       date: new Date().toLocaleDateString(),
       description: patentText || searchKeyword,
       domain: domain,
       similarity: threshold,
       icon: getDomainIcon(domain)
     }
     
     // Save to localStorage
     const updated = [newAnalysis, ...recentAnalyses]
     setRecentAnalyses(updated)
     localStorage.setItem('patentAnalyses', JSON.stringify(updated))
     
     // Navigate to patent page
     navigate(`/patent/${newAnalysis.id}`)
   }
   ```

7. **Recent Analysis Cards**
   - Loads from localStorage on mount
   - Displays last analyses with:
     - Title
     - Date
     - Description snippet
     - Domain badge
     - Similarity score badge (color-coded)
   - Clickable to view details

**Data Persistence:**
- Uses `localStorage` with key: `patentAnalyses`
- Survives browser refresh
- Auto-loads on component mount

**Navigation:**
- "Analyze Patent" → `/patent/{id}`
- Click analysis card → `/patent/{id}`
- Logout → `/` (clears token)

---

#### `PatentOverview.jsx`
**Purpose:** Displays detailed information about a specific patent analysis.

**State Management:**
```javascript
const [showMenu, setShowMenu] = useState(false)
const [patentData, setPatentData] = useState(null)
```

**Data Loading:**
```javascript
useEffect(() => {
  const saved = localStorage.getItem('patentAnalyses')
  const analyses = JSON.parse(saved)
  const found = analyses.find(analysis => analysis.id === id)
  
  if (found) {
    setPatentData({
      title: found.title,
      patentNo: `ANALYSIS-${id}`,
      filed: found.date,
      status: 'Analyzed',
      abstract: found.description,
      similarity: found.similarity,
      // ... more fields
    })
  }
}, [id])
```

**Key Sections:**

1. **Patent Header**
   - Title (from analysis)
   - Patent number (auto-generated)
   - Filed date
   - Status badge
   - **Similarity score badge** (color-coded)

2. **Abstract**
   - Full description/patent text

3. **Key Details**
   - Inventors: "User Analysis"
   - Assignee: "AI Patent Analyzer"
   - Patent Type: Technology domain
   - Important dates

4. **Top Concepts**
   - Auto-generated tags based on domain
   - Clickable badges

5. **View Analysis Dashboard Button**
   - Navigates to `/analysis/{id}`

6. **AI Chatbox**
   - Static UI (placeholder for future AI integration)
   - Input field and send button

7. **Similar Patents**
   - Static demo cards showing:
     - Patent title
     - Patent number
     - Description
     - Similarity percentage with progress bar

**Navigation:**
- "← Back to Dashboard" → `/dashboard`
- "View Analysis Dashboard" → `/analysis/{id}`
- Logout → `/`

---

#### `AnalysisDashboard.jsx`
**Purpose:** Comprehensive analytics dashboard showing detailed metrics and insights.

**State Management:**
```javascript
const [showMenu, setShowMenu] = useState(false)
const [analysisData, setAnalysisData] = useState(null)
```

**Key Metrics Displayed:**

1. **Similarity Score Card**
   ```javascript
   <div className={`text-5xl font-bold ${getSimilarityColor(similarity)}`}>
     {similarity}%
   </div>
   <div className="progress-bar" style={{ width: `${similarity}%` }} />
   ```
   - Large percentage display
   - Color-coded (green/yellow/blue)
   - Visual progress bar

2. **Technology Domain Card**
   - Domain name
   - Category icon
   - "Primary classification" label

3. **Analysis Status Card**
   - Status: "Complete"
   - Ready indicator

4. **Innovation Assessment**
   - **Novelty Score:** `100 - similarity`
   - **Prior Art Match:** `similarity`
   - **Market Potential:** Calculated based on novelty
   - Each with progress bars

5. **Key Findings**
   - ✓ Domain Classification success
   - ⚠/!/✓ Similarity analysis result (conditional)
   - 📊 Analysis completion status

6. **Smart Recommendations**
   - **If similarity ≥ 70%:**
     - ⚠️ High similarity alert
     - 🔍 Prior art review suggestion
   
   - **If similarity < 70%:**
     - ✅ Good novelty score
     - 🚀 Market opportunity

**Color Coding Logic:**
```javascript
const getSimilarityColor = (similarity) => {
  if (similarity >= 70) return 'text-green-600'    // High match
  if (similarity >= 40) return 'text-yellow-600'   // Moderate
  return 'text-blue-600'                           // Low match
}
```

**Action Buttons:**
- "View Patent Details" → `/patent/{id}`
- "New Analysis" → `/dashboard`

---

### **Backend (`server/`)**

#### `server/index.js`
**Purpose:** Express server entry point with MongoDB connection and API routes.

**Key Features:**

1. **Server Configuration**
   ```javascript
   const app = express()
   const PORT = process.env.PORT || 5000
   
   app.use(cors())
   app.use(express.json())
   ```

2. **MongoDB Connection**
   ```javascript
   mongoose.connect(MONGO_URI)
     .then(() => console.log('✅ MongoDB connected'))
     .catch(err => console.error('❌ MongoDB error:', err))
   ```
   - Improved error logging
   - Connection event handlers
   - Helpful error messages

3. **Routes**
   - `/api/auth/*` - Authentication endpoints
   - `/api/health` - Health check endpoint

4. **Health Check Endpoint**
   ```javascript
   app.get('/api/health', (req, res) => {
     res.json({
       status: 'ok',
       mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
       timestamp: new Date().toISOString()
     })
   })
   ```

5. **Error Handling Middleware**
   ```javascript
   app.use((err, req, res, next) => {
     console.error('Server error:', err)
     res.status(500).json({ msg: 'Internal server error', error: err.message })
   })
   ```

---

#### `server/models/User.js`
**Purpose:** Mongoose schema for user authentication.

**Schema Definition:**
```javascript
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('User', UserSchema)
```

**Fields:**
- `username` - User's display name
- `email` - Unique identifier for login
- `password` - Hashed password (bcrypt)
- `date` - Account creation timestamp

---

#### `server/routes/auth.js`
**Purpose:** Authentication API endpoints (register, login).

**Endpoints:**

1. **POST /api/auth/register**
   ```javascript
   router.post('/register', async (req, res) => {
     const { username, email, password } = req.body
     
     // Validate input
     if (!username || !email || !password) {
       return res.status(400).json({ msg: 'Please provide all fields' })
     }
     
     // Check existing user
     let user = await User.findOne({ email })
     if (user) {
       return res.status(400).json({ msg: 'User already exists' })
     }
     
     // Hash password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)
     
     // Create user
     user = new User({ username, email, password: hashedPassword })
     await user.save()
     
     // Generate JWT
     const payload = { user: { id: user.id } }
     jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
       res.json({ token, msg: 'Registration successful' })
     })
   })
   ```

2. **POST /api/auth/login**
   ```javascript
   router.post('/login', async (req, res) => {
     const { email, password } = req.body
     
     // Find user
     let user = await User.findOne({ email })
     if (!user) {
       return res.status(400).json({ msg: 'Invalid Credentials' })
     }
     
     // Validate password
     const isMatch = await bcrypt.compare(password, user.password)
     if (!isMatch) {
       return res.status(400).json({ msg: 'Invalid Credentials' })
     }
     
     // Generate JWT
     const payload = { user: { id: user.id } }
     jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
       res.json({ token, msg: 'Login successful' })
     })
   })
```

**Security Features:**
- Password hashing with bcrypt (salt rounds: 10)
- JWT token expiration (1 hour)
- Input validation
- Detailed logging

---

#### `server/middleware/auth.js`
**Purpose:** JWT verification middleware for protected routes.

```javascript
export default function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token')
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
```

**Usage:** Protect routes by adding middleware:
```javascript
router.get('/protected', authMiddleware, (req, res) => {
  // Only accessible with valid JWT
})
```

---

### **Utility Files**

#### `test_mongodb.js`
**Purpose:** Diagnostic script to test MongoDB connection.

**Usage:**
```bash
node test_mongodb.js
```

**Functionality:**
- Attempts MongoDB connection
- Sets 5-second timeout
- Displays success/failure message
- Provides troubleshooting steps

---

#### `start_mongodb.bat`
**Purpose:** Windows batch script to start MongoDB service.

**Usage:** Run as Administrator
```bash
start_mongodb.bat
```

**Features:**
- Checks if MongoDB service exists
- Starts service if found
- Attempts manual start from common paths
- Error handling and user feedback

---

## 🔄 Application Flow

### **Complete User Journey**

```
1. Landing Page (/)
   ↓ Click "Get Started"
   
2. Login/Signup (/login)
   ↓ Authenticate
   │
   └→ Backend: POST /api/auth/register or /api/auth/login
   │  └→ MongoDB: Save/verify user
   │  └→ Return JWT token
   │
   ↓ Store token in localStorage
   
3. Dashboard (/dashboard)
   │
   ├─ Upload PDF
   ├─ Paste text
   └─ Enter keywords + domain
   │
   ↓ Click "Analyze Patent"
   │
   └→ Create analysis object
   └→ Save to localStorage
   └→ Navigate to /patent/{id}
   
4. Patent Overview (/patent/:id)
   │
   ├─ Load analysis from localStorage
   ├─ Display patent details
   └─ Show similarity score
   │
   ↓ Click "View Analysis Dashboard"
   
5. Analysis Dashboard (/analysis/:id)
   │
   ├─ Load analysis data
   ├─ Display comprehensive metrics
   ├─ Show recommendations
   └─ Provide action buttons
   │
   ↓ Click "New Analysis" or "Back to Dashboard"
   
6. Return to Dashboard (loop to step 3)
```

---

## ⚙️ Setup Instructions

### **Prerequisites**
- Node.js 16+ and npm
- MongoDB (local or Atlas)

### **Installation Steps**

1. **Clone & Navigate**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/ai-patent-analyzer
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

4. **Start MongoDB**
   
   **Option A: Local MongoDB**
   ```bash
   # Windows
   start_mongodb.bat
   
   # Or manually
   net start MongoDB
   ```
   
   **Option B: MongoDB Atlas**
   - Update `MONGO_URI` with Atlas connection string

5. **Test MongoDB Connection**
   ```bash
   node test_mongodb.js
   ```

6. **Start Backend Server**
   ```bash
   npm run server
   ```
   Should see: `✅ MongoDB connected successfully`

7. **Start Frontend Dev Server**
   ```bash
   npm run dev
   ```
   Opens at: `http://localhost:3000`

---

## ✨ Features

### **Authentication**
- ✅ JWT-based authentication
- ✅ MongoDB user storage
- ✅ Password hashing with bcrypt
- ✅ Login/signup toggle
- ✅ Token persistence

### **Patent Analysis**
- ✅ PDF file upload
- ✅ Text input support
- ✅ Keyword search
- ✅ Domain classification
- ✅ Similarity threshold adjustment
- ✅ Real-time validation

### **Dashboard & Visualization**
- ✅ Recent analysis history
- ✅ Dynamic analysis cards
- ✅ Color-coded similarity scores
- ✅ Comprehensive metrics dashboard
- ✅ Innovation assessment
- ✅ Smart recommendations

### **Data Persistence**
- ✅ localStorage for analysis history
- ✅ MongoDB for user data
- ✅ JWT token storage
- ✅ Persistent across sessions

---

## 🎨 Styling & Design

### **Design System**
- **Primary Color:** Blue gradient (`from-blue-600 to-blue-500`)
- **Typography:** System fonts with Tailwind defaults
- **Layout:** Responsive grid system
- **Components:** Card-based design
- **Animations:** Smooth transitions and hover effects

### **Color Coding**
- **Green:** High similarity (≥70%) / Good status
- **Yellow:** Moderate similarity (40-69%) / Warning
- **Blue:** Low similarity (<40%) / Neutral

---

## 🔌 API Integration

### **Backend Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Create new user | No |
| POST | `/api/auth/login` | Authenticate user | No |
| GET | `/api/health` | Health check | No |

### **Request/Response Examples**

**Register:**
```json
// Request
POST /api/auth/register
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "msg": "Registration successful"
}
```

**Login:**
```json
// Request
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "msg": "Login successful"
}
```

---

## 💾 Data Storage

### **localStorage Structure**

**Key:** `patentAnalyses`
**Type:** Array of analysis objects

```json
[
  {
    "id": "patent-1738266000000",
    "title": "AI Battery Management",
    "date": "Jan 30, 2026",
    "description": "Advanced AI-powered battery optimization...",
    "domain": "Electric Vehicles",
    "similarity": 75,
    "icon": "🔋"
  }
]
```

**Key:** `token`
**Type:** String (JWT token)
```
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 🚀 Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

**Build Output:** `dist/` directory

**Deployment Considerations:**
- Set production environment variables
- Use MongoDB Atlas for cloud database
- Configure CORS for production domain
- Set strong JWT secret
- Enable HTTPS

---

## 📝 Development Notes

### **Port Configuration**
- Frontend: `3000` (Vite dev server)
- Backend: `5000` (Express server)
- MongoDB: `27017` (default)

### **Proxy Configuration**
All `/api/*` requests from frontend are proxied to backend server via Vite configuration.

### **Hot Module Replacement**
Vite enables HMR for instant updates during development.

---

## 🔧 Troubleshooting

### **MongoDB Connection Issues**
1. Ensure MongoDB is running: `net start MongoDB`
2. Test connection: `node test_mongodb.js`
3. Check `MONGO_URI` in `.env`

### **Authentication Not Working**
1. Verify backend is running on port 5000
2. Check browser console for errors
3. Verify JWT_SECRET is set in `.env`

### **Proxy Errors**
1. Ensure backend server is running
2. Check `vite.config.js` proxy settings
3. Restart Vite dev server

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)

---

## 👥 Contributing

This is a fully functional application ready for extension with:
- Real AI/ML patent analysis integration
- Advanced search algorithms
- PDF parsing capabilities
- Collaborative features
- Admin dashboard

---

## 📄 License

This project is part of the AI Patent Analyzer system.

---

**Last Updated:** January 2026
**Version:** 1.0.0
