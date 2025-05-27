import { createContext, useContext, useReducer } from 'react';
import type { AstralMap, AstralIsland } from '@/types/AstralMap';

interface AstralState {
  astralMap: AstralMap | null;
  selectedIsland: AstralIsland | null;
}

// ... обычная логика createContext/useReducer
