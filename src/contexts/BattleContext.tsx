// 📄 src/contexts/BattleContext.tsx
'use client';
import React, { createContext, useContext, useReducer } from "react";
import type { Battle } from '@/types/Battle';

interface BattleState {
  currentBattle?: Battle;
  battles: Battle[];
}

const initialState: BattleState = { currentBattle: undefined, battles: [] };

type BattleAction =
  | { type: "SET_BATTLES", payload: Battle[] }
  | { type: "SET_CURRENT_BATTLE", payload: Battle | undefined };

function reducer(state: BattleState, action: BattleAction): BattleState {
  switch (action.type) {
    case "SET_BATTLES": return { ...state, battles: action.payload };
    case "SET_CURRENT_BATTLE": return { ...state, currentBattle: action.payload };
    default: return state;
  }
}

const BattleContext = createContext<{ state: BattleState, dispatch: React.Dispatch<BattleAction> } | undefined>(undefined);

export const BattleProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BattleContext.Provider value={{ state, dispatch }}>
      {children}
    </BattleContext.Provider>
  );
};

export const useBattle = () => {
  const context = useContext(BattleContext);
  if (!context) throw new Error("useBattle must be inside <BattleProvider>");
  return context;
};
