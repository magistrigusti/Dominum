// 📄 src/contexts/BuildingContext.tsx
'use client';
import React, { createContext, useContext, useReducer } from "react";
import type { Building } from '@/types/Building';

interface BuildingState {
  buildings: Building[];
}

const initialState: BuildingState = { buildings: [] };

type BuildingAction =
  | { type: "SET_BUILDINGS", payload: Building[] }
  | { type: "ADD_BUILDING", payload: Building }
  | { type: "UPDATE_BUILDING", payload: Building };

function reducer(state: BuildingState, action: BuildingAction): BuildingState {
  switch (action.type) {
    case "SET_BUILDINGS": return { ...state, buildings: action.payload };
    case "ADD_BUILDING": return { ...state, buildings: [...state.buildings, action.payload] };
    case "UPDATE_BUILDING":
      return { ...state, buildings: state.buildings.map(b => b._id === action.payload._id ? action.payload : b) };
    default: return state;
  }
}

const BuildingContext = createContext<{ state: BuildingState, dispatch: React.Dispatch<BuildingAction> } | undefined>(undefined);

export const BuildingProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BuildingContext.Provider value={{ state, dispatch }}>
      {children}
    </BuildingContext.Provider>
  );
};

export const useBuilding = () => {
  const context = useContext(BuildingContext);
  if (!context) throw new Error("useBuilding must be inside <BuildingProvider>");
  return context;
};
