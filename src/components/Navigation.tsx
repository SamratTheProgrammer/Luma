import React from 'react';
import { ScreenType } from '../types';
import { Compass, LayoutGrid, Flame, MessageSquare, User } from 'lucide-react';

interface NavigationProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  unreadSparksCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  unreadSparksCount = 2
}) => {
  // Hide navigation on welcome and calibration screens to match designs
  if (currentScreen === 'welcome' || currentScreen === 'calibration') {
    return null;
  }

  const navItems: { screen: ScreenType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { screen: 'discover', label: 'Discover', icon: <Compass className="w-5 h-5" /> },
    { screen: 'explore', label: 'Explore', icon: <LayoutGrid className="w-5 h-5" /> },
    { screen: 'sparks', label: 'Sparks', icon: <Flame className="w-5 h-5" />, badge: unreadSparksCount },
    { screen: 'chats', label: 'Chats', icon: <MessageSquare className="w-5 h-5" /> },
    { screen: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-3 px-4 pointer-events-none sm:max-w-md sm:mx-auto">
      <div className="pointer-events-auto mx-auto h-16 rounded-full bg-[#201927]/85 backdrop-blur-2xl px-2 flex items-center justify-between shadow-[0_12px_40px_-8px_rgba(13,7,20,0.85)] border border-white/10">
        {navItems.map(item => {
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.screen}
              type="button"
              onClick={() => onNavigate(item.screen)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] h-12 rounded-full transition-all cursor-pointer ${
                isActive 
                  ? 'text-[#ebdef2] bg-[#2e2736] shadow-[0_4px_20px_rgba(255,94,98,0.25)] border border-[#ff5e62]/30' 
                  : 'text-[#e1bebd] hover:text-[#ebdef2] hover:bg-white/5'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && item.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#ff5e62] text-[#64000f] text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 font-jakarta">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
