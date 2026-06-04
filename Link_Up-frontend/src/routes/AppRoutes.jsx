import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Public Pages
import LandingPage from "../pages/Home/Landing_page";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Protected Pages
import DiscoverQuests from "../pages/Quests/DiscoverQuests";
import SocialFeed from "../pages/Feed/SocialFeed";
import CreateQuest from "../pages/Quests/CreateQuest";
import QuestDetail from "../pages/Quests/QuestDetail";
import ApplyToQuest from "../pages/Quests/ApplyToQuest";
import ApplicationsDashboard from "../pages/Applications/ApplicationsDashboard";
import MyApplications from "../pages/Applications/MyApplications";
import Messages from "../pages/Messages/Messages";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import Search from "../pages/Search/Search";
import Notifications from "../pages/Notifications/Notifications";
import Feed from "../pages/Feed/Feed";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Auth Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Feed redirects to discover quests as requested in the design change /feed → DiscoverQuests */}
        <Route path="/feed" element={<Feed />} />

        {/* <Route path="/feed" element={<DiscoverQuests />} /> */} 
        
        
        <Route path="/social" element={<SocialFeed />} />

        <Route path="/quests" element={<DiscoverQuests />} />
        <Route path="/quests/create" element={<CreateQuest />} />
        <Route path="/quests/:id" element={<QuestDetail />} />
        <Route path="/quests/:id/apply" element={<ApplyToQuest />} />

        <Route path="/applications" element={<ApplicationsDashboard />} />
        <Route path="/applications/my" element={<MyApplications />} />

        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:id" element={<Messages />} />

        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/:username" element={<Profile />} />

        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>404 Not Found</h1>} />

    </Routes>
  );
}