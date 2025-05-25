// 📦 src/contexts/ShipContext.tsx
'use client';
import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { Ship } from "@/types/Ship";

interface ShipContextState {
  ships: Ship[];
  loading: boolean;
  error: string | null;
}

const initialState: ShipContextState = {
  ships: [],
  loading: true,
  error: null,
};

type ShipAction =
  | { type: "SET_SHIPS"; payload: Ship[] }
  | { type: "UPDATE_SHIP"; payload: { id: string; data: Partial<Ship> } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

function reducer(state: ShipContextState, action: ShipAction): ShipContextState {
  switch (action.type) {
    case "SET_SHIPS":
      return { ...state, ships: action.payload, loading: false, error: null };
    case "UPDATE_SHIP":
      return {
        ...state,
        ships: state.ships.map(s =>
          s._id === action.payload.id
            ? { ...s, ...action.payload.data }
            : s
        ),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const ShipContext = createContext<{
  state: ShipContextState;
  dispatch: React.Dispatch<ShipAction>;
  refetchShips: () => Promise<void>;
} | undefined>(undefined);

const fetchShips = async (): Promise<Ship[]> => {
  const res = await fetch('/api/ships/list');
  if (!res.ok) throw new Error('Ошибка загрузки кораблей');
  const data = await res.json();
  return data.ships;
};

export const ShipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const refetchShips = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const ships = await fetchShips();
      dispatch({ type: "SET_SHIPS", payload: ships });
    } catch (e: any) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  };

  useEffect(() => {
    refetchShips();
  }, []);

  return (
    <ShipContext.Provider value={{ state, dispatch, refetchShips }}>
      {children}
    </ShipContext.Provider>
  );
};

export const useShips = () => {
  const ctx = useContext(ShipContext);
  if (!ctx) throw new Error("useShips должен использоваться внутри <ShipProvider>");
  return ctx;
};
