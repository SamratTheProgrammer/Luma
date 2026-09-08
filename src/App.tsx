import React, { useState } from 'react';
import { ScreenType, CuratedProfile, CalibrationState, SparkItem } from './types';
import { PROFILES, INITIAL_CALIBRATION, INITIAL_SPARKS } from './data/mockData';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { CalibrationScreen } from './components/screens/CalibrationScreen';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import { MatchDetailScreen } from './components/screens/MatchDetailScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { SparksScreen } from './components/screens/SparksScreen';
import { ChatScreen } from './components/screens/ChatScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { FilterModal } from './components/FilterModal';
import { ScreenNavigatorModal } from './components/ScreenNavigatorModal';
import { triggerHaptic } from './utils/haptics';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [profileIndex, setProfileIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<CuratedProfile>(PROFILES[0]);
  const [calibration, setCalibration] = useState<CalibrationState>(INITIAL_CALIBRATION);
  const [sparks, setSparks] = useState<SparkItem[]>(INITIAL_SPARKS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterMinDna, setFilterMinDna] = useState(85);
  const [filterDistance, setFilterDistance] = useState(5);
  const [isScreenNavOpen, setIsScreenNavOpen] = useState(false);

  const currentProfile = PROFILES[profileIndex % PROFILES.length];

  const handleNextProfile = () => {
    setProfileIndex(prev => (prev + 1) % PROFILES.length);
  };

  const handleSendSpark = (profile: CuratedProfile) => {
    const existingIndex = sparks.findIndex(s => s.profileId === profile.id);
    if (existingIndex === -1) {
      const newSpark: SparkItem = {
        id: `spark-${Date.now()}`,
        profileId: profile.id,
        name: profile.name,
        avatarUrl: profile.avatarUrl,
        timestamp: 'Just now',
        preview: `You sent a Spark to ${profile.name} ✨`,
        matchScore: profile.matchDnaScore,
        status: 'sent'
      };
      setSparks(prev => [newSpark, ...prev]);
    }
  };

  const handleSaveSpark = (profile: CuratedProfile) => {
    handleSendSpark(profile);
  };

  const handleSuggestDate = (profile: CuratedProfile) => {
    handleSendSpark(profile);
    // Auto add a spark note
    setSparks(prev => [
      {
        id: `spark-date-${Date.now()}`,
        profileId: profile.id,
        name: profile.name,
        avatarUrl: profile.avatarUrl,
        timestamp: 'Just now',
        preview: `Date suggestion shared: ${profile.dateSuggestion.title}`,
        matchScore: profile.overlapScore,
        status: 'sent'
      },
      ...prev
    ]);
  };

  const handleOpenChatWithProfile = (profile: CuratedProfile) => {
    setSelectedProfile(profile);
    setCurrentScreen('chats');
  };

  const handleViewDetail = (profile: CuratedProfile) => {
    setSelectedProfile(profile);
    setCurrentScreen('match-detail');
  };

  return (
    <div className="min-h-screen bg-[#17111e] text-[#ebdef2] flex flex-col font-jakarta relative selection:bg-[#ff5e62] selection:text-[#64000f] overscroll-y-contain">
      {/* Persistent App Header (on discover, explore, sparks, chats, profile) */}
      <Header
        currentScreen={currentScreen}
        onOpenFilters={() => {
          triggerHaptic('tap');
          setIsFilterOpen(true);
        }}
        onNavigateProfile={() => {
          triggerHaptic('tap');
          setCurrentScreen('profile');
        }}
        onOpenScreenNavigator={() => {
          triggerHaptic('tap');
          setIsScreenNavOpen(true);
        }}
      />

      {/* Main Screen Content Frame */}
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col relative">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onCreateProfile={() => setCurrentScreen('calibration')}
            onLogin={() => setCurrentScreen('discover')}
          />
        )}

        {currentScreen === 'calibration' && (
          <CalibrationScreen
            onBack={() => setCurrentScreen('welcome')}
            onContinue={() => setCurrentScreen('discover')}
          />
        )}

        {currentScreen === 'discover' && (
          <DiscoverScreen
            profile={currentProfile}
            onViewMatchDetail={handleViewDetail}
            onNextProfile={handleNextProfile}
            onSendSpark={handleSendSpark}
            onFilterClick={() => {
              triggerHaptic('tap');
              setIsFilterOpen(true);
            }}
          />
        )}

        {currentScreen === 'match-detail' && (
          <MatchDetailScreen
            profile={selectedProfile}
            onBack={() => setCurrentScreen('discover')}
            onSendSpark={handleSendSpark}
            onSaveSpark={handleSaveSpark}
            onSuggestDate={handleSuggestDate}
          />
        )}

        {currentScreen === 'explore' && (
          <ExploreScreen
            onSelectProfile={handleViewDetail}
          />
        )}

        {currentScreen === 'sparks' && (
          <SparksScreen
            sparks={sparks}
            onOpenChat={handleOpenChatWithProfile}
            onViewMatchDetail={handleViewDetail}
          />
        )}

        {currentScreen === 'chats' && (
          <ChatScreen
            profile={selectedProfile}
            onBack={() => setCurrentScreen('sparks')}
            onViewMatchDetail={() => setCurrentScreen('match-detail')}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            calibration={calibration}
            onRecalibrate={() => setCurrentScreen('calibration')}
            onLogout={() => setCurrentScreen('welcome')}
            onNavigateScreen={(screen) => setCurrentScreen(screen)}
          />
        )}
      </main>

      {/* Floating Bottom Navigation (on discover, explore, sparks, chats, profile) */}
      <Navigation
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          triggerHaptic('tap');
          setCurrentScreen(screen);
        }}
        unreadSparksCount={sparks.length}
      />

      {/* Screen Navigator Modal (properly adjusted after login) */}
      <ScreenNavigatorModal
        isOpen={isScreenNavOpen}
        currentScreen={currentScreen}
        onClose={() => setIsScreenNavOpen(false)}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(distance, minDna) => {
          setFilterDistance(distance);
          setFilterMinDna(minDna);
          triggerHaptic('success');
        }}
      />
    </div>
  );
}
