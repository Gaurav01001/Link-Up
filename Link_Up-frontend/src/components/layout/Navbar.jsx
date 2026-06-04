import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '../../store/auth.store'
import Avatar from '../common/Avatar'
import Button from '../common/Button';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { name: "Feed", path: "/feed" },
    { name: "Quests", path: "/quests" },
    { name: "Messages", path: "/messages" },
  ]
  
  return (
    <nav className="sticky top-0 z-50 h-[60px] w-full border-b border-[#E8E6E1] bg-white dark:border-[#312F2C] dark:bg-[#141412]/85 dark:backdrop-blur-md transition-all duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Brand/Logo */}
        <div className="flex items-center">
          <h2 
            onClick={() => navigate("/feed")} 
            className="text-xl font-extrabold tracking-tight text-[#FF6B47] cursor-pointer hover:opacity-90 active:scale-95 transition-all select-none font-sans"
          >
            Side Quest
          </h2>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={`px-3 py-1.5 text-sm font-medium rounded-[10px] transition-all duration-150 ${
                  isActive 
                    ? 'text-[#FF6B47] bg-[#FFF1EE] dark:bg-[#FF7A5C]/10 dark:text-[#FF7A5C]' 
                    : 'text-[#6B6860] hover:text-[#1A1916] hover:bg-[#F5F4F1] dark:text-[#9E9B95] dark:hover:text-[#F0EEE9] dark:hover:bg-[#272724]'
                }`}
              >
                {item.name}
              </Button>
            )
          })} 
        </div>

        {/* CTA and Profile */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate('/roles/create')}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#FF6B47] hover:bg-[#E85A38] rounded-[10px] shadow-xs transition-all hover:-translate-y-[1px] active:translate-y-0 cursor-pointer"
          >
            Create Quest
          </Button>

          <Avatar
            src={user?.profile?.avatar}
            username={user?.username}
            size="sm"
          />
        </div>

      </div>
    </nav>
  )
}


