// 📦 src/contexts/HeroContext.tsx
'use client';
import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { Hero } from "@/types/Hero";

interface HeroContextState {
  heroes: Hero[];
  loading: boolean;
  error: string | null;
}

const initialState: HeroContextState = {
  heroes: [],
  loading: true,
  error: null,
};

type HeroAction =
  | { type: "SET_HEROES"; payload: Hero[] }
  | { type: "UPDATE_HERO"; payload: { id: string; data: Partial<Hero> } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

function reducer(state: HeroContextState, action: HeroAction): HeroContextState {
  switch (action.type) {
    case "SET_HEROES":
      return { ...state, heroes: action.payload, loading: false, error: null };
    case "UPDATE_HERO":
      return {
        ...state,
        heroes: state.heroes.map(h =>
          h._id === action.payload.id
            ? { ...h, ...action.payload.data }
            : h
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

const HeroContext = createContext<{
  state: HeroContextState;
  dispatch: React.Dispatch<HeroAction>;
  refetchHeroes: () => Promise<void>;
} | undefined>(undefined);

const fetchHeroes = async (): Promise<Hero[]> => {
  const res = await fetch('/api/heroes/list');
  if (!res.ok) throw new Error('Ошибка загрузки героев');
  const data = await res.json();
  return data.heroes;
};

export const HeroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const refetchHeroes = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const heroes = await fetchHeroes();
      dispatch({ type: "SET_HEROES", payload: heroes });
    } catch (e: any) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  };

  useEffect(() => {
    refetchHeroes();
  }, []);

  return (
    <HeroContext.Provider value={{ state, dispatch, refetchHeroes }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHeroes = () => {
  const ctx = useContext(HeroContext);
  if (!ctx) throw new Error("useHeroes должен использоваться внутри <HeroProvider>");
  return ctx;
};
