export interface ProgressState {
  protagonists: Record<string, { unlocked: boolean }>;
}

export const progressService = {
  getProtagonistProgress: (id: string): boolean => {
    try {
      const data = localStorage.getItem('gameProgress');
      if (data) {
        const parsed: ProgressState = JSON.parse(data);
        return parsed.protagonists?.[id]?.unlocked || false;
      }
    } catch {}
    
    // Default unlock states
    if (id === 'jixiujie') return true;
    return false;
  },

  unlockProtagonist: (id: string) => {
    try {
      let state: ProgressState = { protagonists: {} };
      const data = localStorage.getItem('gameProgress');
      if (data) {
        state = JSON.parse(data);
      }
      
      if (!state.protagonists) state.protagonists = {};
      state.protagonists[id] = { unlocked: true };
      
      localStorage.setItem('gameProgress', JSON.stringify(state));
    } catch {}
  }
};
