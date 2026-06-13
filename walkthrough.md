# S!deQuest (Link_Up) — Frontend Architecture & Walkthrough

Welcome to the frontend architecture and walkthrough of **S!deQuest** (formerly **Link_Up**), a premium real-world social experience platform designed for human connection.  

This document provides a comprehensive overview of the frontend folder structure, routing guards, state management, layouts, pages, and how they interact with each other.

---

## 📂 Project Directory Structure

The frontend is built with **React (Vite)**, styled using **Tailwind CSS**, and located under `Link_Up-frontend/src`. Here is the core structure of the project:

```
src/
├── api/                  # API client singletons
│   ├── axios.js          # HTTP client with request headers & global 401 interceptor
│   └── socket.js         # Socket.io connection manager for real-time chat
│
├── config/               # Application configuration
│   └── env.js            # Unified environment variables (API URL, Socket URL, Feature Flags)
│
├── components/           # Reusable UI elements
│   ├── common/           # Foundation elements (Button, Input, Avatar, Loader, Badge, Modal)
│   ├── layout/           # Shared layout containers (Navbar, PageLayout, MobileNav)
│   ├── feed/             # Feed cards and create post modals
│   ├── quests/           # Activity / quest listing cards, filters, and forms
│   └── ui/               # Advanced interactive elements (smooth background shaders, particles)
│
├── pages/                # Views connected to routing
│   ├── Home/             # Landing page with interactive smooth background
│   ├── Auth/             # Register, Login, ForgotPassword, ResetPassword
│   ├── Quests/           # DiscoverQuests, QuestDetail, CreateQuest, ApplyToQuest
│   ├── Feed/             # Feed page, SocialFeed updates
│   ├── Messages/         # Real-time chat dashboard
│   ├── Profile/          # Profile view and editing
│   ├── Applications/     # ApplicationsDashboard (host), MyApplications (applicant)
│   └── Search/           # Global search page
│
├── services/             # API request wrappers (Pure HTTP requests)
│   ├── auth.service.js   # Authentication, forgot/reset password API
│   ├── quest.service.js  # Creating, fetching, and joining quests
│   └── post.service.js   # Post feed interactions (likes, creation)
│
├── store/                # Global State Management (Zustand)
│   ├── auth.store.js     # User session, JWT tokens, authentication status
│   ├── quest.store.js    # Quests list, filter parameters, and detail state
│   └── post.store.js     # Post lists, page indexing, and optimistic likes
│
├── routes/               # Routing & security guards
│   ├── AppRoutes.jsx     # Main URL-to-page registry
│   ├── ProtectedRoute.jsx# Block unauthenticated users, redirecting to /login
│   └── PublicRoute.jsx   # Redirect authenticated users away from auth pages to /feed
│
├── utils/                # Constants and helper functions
│   └── constants.js      # App routes, connection statuses, API constants
│
├── App.jsx               # Entry component hydrates auth state and mounts AppRoutes
└── main.jsx              # Mounts react app wrapped in BrowserRouter
```

---

## 🔑 Core Pillars of the Application

### 1. Unified Environment Config (`src/config/env.js`)
Rather than calling `import.meta.env` in multiple locations, all environment values are consolidated here:
* `API_BASE_URL`: The server endpoint. Defaults to `http://localhost:5000`.
* `SOCKET_URL`: The socket endpoint (usually matches `API_BASE_URL`).

### 2. HTTP Request Layer (`src/api/axios.js`)
Configures a centralized Axios instance:
* **Authorization Injection**: Inserts `Bearer <token>` on all requests if a token exists in `localStorage`.
* **Fail Safe Interceptor**: Catches `401 Unauthorized` responses. If the error occurs on a protected route (non-auth route), it automatically logs out the user and redirects them to `/login`.

### 3. Global State Management (`src/store/`)
Powered by **Zustand** stores which follow a uniform state design:
```javascript
{
  user: null,          // Data container
  loading: false,      // Async status
  error: null,         // Error notification string
}
```
Zustand is responsible for calling API services, writing to `localStorage` (like storing tokens), triggering Socket connections, and managing global component state.

### 4. Real-time Communication Layer (`src/api/socket.js`)
Implements a lazy-initialized singleton connection to Socket.io:
* When a user successfully logs in, Zustand triggers `connectSocket(userId)`, joining their secure chat stream.
* On logout, `disconnectSocket()` shuts down the socket channel.

---

## 🛣️ Routing & Security Guard System

Authentication state protects routes dynamically inside [AppRoutes.jsx](file:///d:/Link_Up/Link_Up-frontend/src/routes/AppRoutes.jsx):

```
                       ┌──────────────────────┐
                       │      Landing (/)     │ (Public)
                       └──────────┬───────────┘
                                  │
                  ┌───────────────┴───────────────┐
                  ▼                               ▼
       ┌────────────────────┐          ┌────────────────────┐
       │   Public Route     │          │   Protected Route  │
       │  (/login, /register│          │(/feed, /quests,...)│
       │  /forgot-password) │          └──────────┬─────────┘
       └──────────┬─────────┘                     │
                  │                               ▼
                  ▼                     ┌───────────────────┐
        Redirects to /feed if           │  PageLayout Shell │
           authenticated                │  - Navbar (Top)   │
                                        │  - Page Content   │
                                        └───────────────────┘
```

---

## 🎨 Layout & Premium Visual Elements

Every protected page rendered under `ProtectedRoute` is automatically wrapped inside **PageLayout** which houses:
1. **Navbar**: Top sticky navigation containing:
   * Brand text (**Side Quest**) redirecting to feed.
   * Central navigation links (Feed, Quests, Messages) with active route highlighting.
   * **Create Quest CTA** button in brand coral color.
   * **Avatar Profile Dropdown**: Clicking the user's avatar opens a menu with user details (name, email) and a "Sign Out" button.
2. **Body Workspace**: Fluid responsive container that conforms to standard page widths.

---

## 💻 Authentication Flows

### 1. User Registration (`/register`)
Users register with name, email, and password. Client-side checks ensure password matching and minimum length rules.

### 2. User Login (`/login`)
Users log in. Incorrect credentials return `"Wrong email or password."` without disclosing if the account exists. If a user hits 5 failed attempts, they are locked out on the backend and receive `"Too many failed login attempts. Please try again later."` for 15 minutes.

### 3. Password Recovery (`/forgot-password` & `/reset-password`)
* **Forgot Password Page**: Users submit their email. The app sends a reset token request to the backend. The backend dispatches an email containing the reset URL:
  `http://localhost:5173/reset-password?token=<token>`
* **Reset Password Page**: Users open the link, confirm their new password, and on success, are redirected back to the login page.
