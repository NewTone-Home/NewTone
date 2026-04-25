import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WorldsChumo from './pages/WorldsChumo';
import Landing from './pages/Landing';
import LibraryPage from './pages/Library';
import { ThemeProvider } from './contexts/ThemeContext';
import DevResetButton from './components/DevResetButton';

function MainApp() {
  return (
    <div className="min-h-screen relative w-full overflow-hidden flex flex-col">
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-[#F3E9D0] text-[#8B6F3E]">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/worlds/chumo" element={<WorldsChumo />} />
          <Route path="/read/:route/:chapter" element={<WorldsChumo />} />
          {/* Redirects for legacy or missing active route */}
          <Route path="/read/:route" element={<WorldsChumo />} />
          <Route path="*" element={<Navigate to="/library" replace />} />
        </Routes>
      </Suspense>
      <DevResetButton />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
