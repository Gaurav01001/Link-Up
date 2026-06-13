# S!deQuest (Link_Up) — Complete Step-by-Step Frontend Implementation Plan

This guide outlines every single coding step required to implement and wire up all components, pages, services, routes, and state stores to fully complete the frontend application.

---

## 🛠️ PHASE 1 — Core Infrastructure

### Step 1 — Install Dependencies
Install the required base library packages inside `Link_Up-frontend/`:
```bash
npm install zustand axios socket.io-client react-router-dom
```

### Step 2 — Unified Environment Configuration (`src/config/env.js`)
Create a single source of truth for variables:
* `API_BASE_URL`: Loaded from `VITE_API_URL` env variable, falling back to `http://localhost:5000`.
* `SOCKET_URL`: Same as `API_BASE_URL`.
* `FEATURES`: Feature flag toggles (e.g., `enableNotifications: true`).

### Step 3 — Centralized Axios HTTP Instance (`src/api/axios.js`)
* Create an axios client with `baseURL` set to `API_BASE_URL`.
* **Request Interceptor**: Extracts JWT token from `localStorage` and appends it to request headers as `Authorization: Bearer <token>`.
* **Response Interceptor**: Intercepts `401 Unauthorized` responses globally. If the error occurs on protected routes (excluding login, register, forgot-password, and reset-password), it wipes user data from `localStorage` and redirects to `/login`.

### Step 4 — Socket Client Manager (`src/api/socket.js`)
Initialize a singleton socket connector:
* Keeps a single reference `let socket = null`.
* `getSocket()`: Creates a new Socket.io instance with `autoConnect: false` if it doesn't exist.
* `connectSocket(userId)`: Connects the socket and emits a `'join'` event containing the user's ID.
* `disconnectSocket()`: Safely disconnects the socket on logout.

### Step 5 — Auth Service Requests (`src/services/auth.service.js`)
Create pure API request wrapper functions:
* `register(data)`: POSTs to `/auth/register`.
* `login(data)`: POSTs to `/auth/login`.
* `forgotPassword(email)`: POSTs to `/auth/forgot-password`.
* `resetPassword(token, password)`: POSTs to `/auth/reset-password`.
* `getMe()`: GETs user profile data from `/auth/me`.
* `logout()`: POSTs to `/auth/logout`.
     
### Step 6 — Auth Session Zustand Store (`src/store/auth.store.js`)
Create the authentication state container:
* **State**: `user`, `token`, `loading`, `error`, `authenticated`, `initialized`.
* **Actions**:
  * `login(credentials)`: Calls the service, saves the returned token, hydrates user state, and starts the socket.
  * `register(userData)`: Calls registration endpoint, stores session, and starts socket.
  * `logout()`: Safely calls API logout, clears local storage, disconnects socket, and resets state.
  * `fetchCurrentUser()`: Fetches `/auth/me` on startup.
  * `init()`: Runs on app boot to check for existing localStorage tokens, triggering `fetchCurrentUser()` if found.

### Step 7 — App Bootstrapper (`src/main.jsx`)
* Wrap the root `<App />` component in React Router's `<BrowserRouter>`.
* Import and render global styles `index.css`.

### Step 8 — Main Wrapper Container (`src/App.jsx`)
* Execute `authStore.init()` in an initialization `useEffect` on component mount to restore active sessions.
* Render the routing table `<AppRoutes />`.

### Step 9 — Protected Route Guard (`src/routes/ProtectedRoute.jsx`)
* Check `initialized` state. If loading, display a full-screen `<Loader />`.
* Check `authenticated` state. If false, block rendering and redirect using `<Navigate to="/login" replace />`.
* If authenticated, render `<Outlet />`.

### Step 10 — Public Route Guard (`src/routes/PublicRoute.jsx`)
* Wait for `initialized` to be true.
* If user is already logged in, redirect them to `/feed` via `<Navigate to="/feed" replace />`.
* Otherwise, allow access to authentication pages (`/login`, `/register`, `/forgot-password`, etc.) by rendering `<Outlet />`.

### Step 11 — Router Table Registry (`src/routes/AppRoutes.jsx`)
Map all page routes, grouping public/protected layouts:
* **Public**: `/` (Landing), `/login`, `/register`, `/forgot-password`, `/reset-password`.
* **Protected**: `/feed`, `/quests`, `/quests/create`, `/quests/:id`, `/quests/:id/apply`, `/messages`, `/messages/:id`, `/profile/:username`, `/profile/edit`, `/search`, `/notifications`, `/applications`, `/applications/my`.

---

## 🎨 PHASE 2 — Reusable UI Components

### Step 12 — Loader Spinner Component (`src/components/common/Loader.jsx`)
Create a configurable spinner that takes `size` (`sm`, `md`, `lg`) and `full` (renders a full-screen overlay backdrop) props.

### Step 13 — Input Field Component (`src/components/common/Input.jsx`)
Create a custom text input wrapper that automatically handles:
* Labels, placeholders, and types.
* Validation error text display.
* Custom icon slots (e.g., show/hide password buttons).

### Step 14 — Standard Button Component (`src/components/common/Button.jsx`)
A robust button wrapping variants (`primary`, `secondary`, `ghost`, `danger`) that automatically disables interaction and swaps content for a loading spinner when the `loading` prop is true.

### Step 15 — Avatar Component (`src/components/common/Avatar.jsx`)
Displays user profile pictures:
* Accepts `src`, `username`, and `size` (`sm`, `md`, `lg`).
* Falls back to generating a stylized DiceBear avatar based on `username` if no custom profile picture is found.

---

## 🔒 PHASE 3 — Authentication Pages

### Step 16 — Login View Page (`src/pages/Auth/Login.jsx`)
* User enters email and password.
* Submit invokes `authStore.login()`.
* Handles wrong password errors and lockout limits securely.
* Houses a "Forgot password?" Link.

### Step 17 — Registration View Page (`src/pages/Auth/Register.jsx`)
* Form fields: Name, Username, Email, Password, Confirm Password.
* Performs passwords-match checks before sending requests.
* Submit invokes `authStore.register()`.

### Step 18 — Forgot Password Request Page (`src/pages/Auth/ForgotPassword.jsx`)
* Form collecting email address.
* Submit calls `authService.forgotPassword()`.
* Shows user a status notification (success or error message).

### Step 19 — Reset Password Page (`src/pages/Auth/ResetPassword.jsx`)
* Obtains reset token from URL query string (`?token=<token>`).
* Form collecting new password and confirmation.
* Performs password length and matching validation.
* Calls `authService.resetPassword()`, shows success, and redirects to `/login` after 3 seconds.

---

## 📐 PHASE 4 — Layout Shell System

### Step 20 — Sticky Navbar Header (`src/components/layout/Navbar.jsx`)
* Top sticky bar (60px height) with glassmorphic styling in dark mode.
* Left brand title (**Side Quest**) navigating to feed.
* Middle links (Feed, Quests, Messages) with active route checks using `useLocation`.
* CTA button for "Create Quest".
* Right Avatar dropdown: Shows profile information and toggles a menu containing a "Sign Out" button. Includes a full-screen click-away overlay.

### Step 21 — Responsive Sidebar (`src/components/layout/Sidebar.jsx`)
* Left navigation panel visible on tablet/desktop viewports.
* Links to Feed, Messages, Quests, Profile, Notifications.

### Step 22 — Bottom Mobile Navigation (`src/components/layout/MobileNav.jsx`)
* Bottom tab navigation menu visible on mobile viewports (< 768px).
* Quick-action buttons matching native app user experience.

### Step 23 — Layout Shell Wrapper (`src/components/layout/PageLayout.jsx`)
* Wraps all protected views.
* Renders `Navbar` at the top, `Sidebar` on the left, `MobileNav` at the bottom (on mobile), and displays page children inside a main scrollable window.

---

## 📝 PHASE 5 — Social Feed & Posts

### Step 24 — Post Service requests (`src/services/post.service.js`)
* `getPosts(cursor)`: Fetch posts page by page for infinite scroll.
* `createPost(data)`: Create a text update.
* `likePost(postId)`: POST to `/posts/:id/like`.
* `unlikePost(postId)`: DELETE to `/posts/:id/like`.
* `deletePost(postId)`: DELETE to `/posts/:id`.

### Step 25 — Post Zustand Store (`src/store/post.store.js`)
State management for posts feed:
* **State**: `posts`, `loading`, `error`, `hasMore`, `cursor`.
* **Actions**:
  * `fetchPosts()`: Resets post arrays and loads the initial page.
  * `fetchMorePosts()`: Appends new pages on scroll.
  * `addPost(post)`: Prepends newly created posts.
  * `likePost(postId)`: Performs optimistic UI updates, incrementing likes instantly, and rolls back if the server fails.
  * `deletePost(postId)`: Filters out deleted posts.

### Step 26 — Intersection Observer Hook (`src/hooks/useInfiniteScroll.js`)
Custom scroll observer hook:
* Takes a callback and a loading state.
* Attaches `IntersectionObserver` to a trigger element at the bottom of the feed.
* Automatically triggers the callback when the user scrolls near the bottom.

### Step 27 — Post Card Component (`src/components/feed/PostCard.jsx`)
Displays user posts with profile images, username headers, timestamps, post content body, and like/delete action links.

### Step 28 — Create Post Modal (`src/components/feed/CreatePostModal.jsx`)
Text-entry dialog box with maximum length validation counters. Creates post and updates feed.

### Step 29 — Feed Container Page (`src/pages/Feed/Feed.jsx`)
Combines `CreatePostModal`, `PostCard` mapping, and `useInfiniteScroll` to construct the central community wall.

---

## 💬 PHASE 6 — Real-time Messaging & WebSockets

### Step 30 — Socket state store (`src/store/socket.store.js`)
Zustand store tracking websocket parameters:
* `onlineUsers`: List of online user IDs.
* `typingUsers`: Registry mapping active conversation IDs to arrays of typing user IDs.

### Step 31 — Socket Event Hook (`src/hooks/useSocket.js`)
Listens to socket server broadcasts:
* Subscribes to `'online_users'`, `'user_online'`, and `'user_offline'` on mount.
* Cleans up listener subscriptions on unmount.

### Step 32 — Message Requests service (`src/services/message.service.js`)
* `getConversations()`: Fetch active conversation threads.
* `getMessages(userId)`: Load messages for a single user thread.
* `sendMessage(userId, content)`: Send a message.

### Step 33 — Message Zustand Store (`src/store/message.store.js`)
* **State**: `conversations`, `activeConversation`, `messages`, `loading`, `error`.
* **Actions**:
  * `fetchConversations()`: Pulls thread history.
  * `openConversation(userId)`: Opens chat interface.
  * `sendMessage(userId, content)`: Sends message to API.
  * `receiveMessage(msg)`: Prepends/appends incoming websocket messages into state.

### Step 34 — Chat View Dashboard (`src/pages/Messages/Messages.jsx`)
* **Left Panel**: Scrollable listing of chat history, user avatars, and online presence green dots.
* **Right Panel**: Chat content feed with typing indicator animations and text input bar.

---

## 🏕️ PHASE 7 — Quests & Remaining Views

### Step 35 — Quest requests service (`src/services/quest.service.js`)
* Functions to create, update, apply, accept, and reject quest listings and applications.

### Step 36 — Quest state store (`src/store/quest.store.js`)
* Zustand store holding active search results, filter criteria, and selected quest details.

### Step 37 — Discover Quests Page (`src/pages/Quests/DiscoverQuests.jsx`)
Renders the primary quest matching board:
* Grid layout displaying `<QuestCard />` components.
* Sidebar housing filters (`QuestFilters.jsx`) like category, location, and date selectors.

### Step 38 — Quest Details Page (`src/pages/Quests/QuestDetail.jsx`)
Renders the full specifications of a selected quest:
* Layout: 60% description & host info, 40% sticky side actions (apply button, spots remaining, accepted participant avatar stacks).

### Step 39 — Create/Edit Quest Page (`src/pages/Quests/CreateQuest.jsx`)
Form fields (`QuestForm.jsx`) where users can input titles, categories, dates, locations, total spots, and tags to submit.

### Step 40 — Apply to Quest Page (`src/pages/Quests/ApplyToQuest.jsx`)
Collects application answers (e.g. details on why they want to join) and submits them via `<ApplyModal />`.

### Step 41 — User Profiles Page (`src/pages/Profile/Profile.jsx`)
Displays user stats (quests hosted, posts shared, rating scores), bio, connection status buttons, and edit profile linkages (`EditProfile.jsx`).

### Step 42 — Applications Dashboard (`src/pages/Applications/ApplicationsDashboard.jsx`)
Host dashboard allowing creators to accept or reject applicants utilizing `<ApplicantCard />`.

### Step 43 — My Applications Dashboard (`src/pages/Applications/MyApplications.jsx`)
Applicant dashboard showing active quest request statuses (Accepted, Pending, Rejected).
