// 📄 src/context/UserContext.tsx
'use client';
import React, { createContext, useContext, useReducer } from "react";
import type { Hero } from '@/types/heroes';
import type { ArmyUnitType } from '@/config/armyCapacity';
import type { Mission } from '@/types/missions';
export interface UserState {
  address: string;
  avatar?: string;
  name?: string;
  prestige: number;
  levelPrestige: number;
  prestigeProgress: number;
  technologies: string;
  food: number;
  wood: number;
  stone: number;
  iron: number;
  gold: number;
  doubloon: number;
  pearl: number;
  allodium: number;
  questPanelOpen?: boolean;
  questShipRepaired?: boolean;
  army?: {
    [key in ArmyUnitType]?: {
      level: number;
      count: number;
    }
  };
  heroes: {
    id: string;
    name: string;
    image: string;
    quality: 'normal' | 'good' | 'rare' | 'epic' | 'legendary';
    level: number;
    exp: number;
    expToNext: number;
  }[];
  resourceNodes?: {
    id: string;
    resource: string;
    level: number;
    position: { x: number; y: number };
    remaining: number;
    lastRestoredAt?: string;
    avatar?: string;
  }[];
  activeMining?: {
    resource: string;
    heroId: string;
    startedAt: string;
    duration: number;
    position: {
      x: number;
      y: number;
    };
    remaining: number;
  }
  activeQuest?: {
    id: string;
    title: string;
    description: string;
    status: "active" | "complete";
  };
  missions?: Mission[];
}

type ResourceField = Exclude<keyof UserState, "address" | "avatar" | "technologies">;

type UserAction =
  | { type: "SET_USER"; payload: UserState }
  | { type: "ADD_RESOURCE"; resource: ResourceField; amount: number }
  | { type: "SET_ACTIVE_QUEST"; 
      payload: {
        id: string;
        title: string;
        description: string;
        status: "active" | "complete";
      };
    }
  | { type: "TOGGLE_QUEST_PANEL"; payload: boolean }
  | { type: "SET_HEROES"; payload: Hero[] }
  | { type: "SET_ARMY"; payload: UserState["army"] }
  | { type: "SET_MISSIONS"; payload: Mission[]}


const initialState: UserState = {
  address: "",
  avatar: "",
  prestige: 0,
  levelPrestige: 0,
  prestigeProgress: 0,
  technologies: "",
  food: 0,
  wood: 0,
  stone: 0,
  iron: 0,
  gold: 0,
  doubloon: 0,
  pearl: 0,
  allodium: 0,
  activeQuest: undefined,
  questShipRepaired: false,
  heroes: [],
  activeMining: undefined,
  missions: [],
  army: {
    peasant: { level: 1, count: 0 },
    sailor: { level: 1, count: 0 },
    axeman: { level: 1, count: 0 },
    spearman: { level: 1, count: 0 },
    archer: { level: 1, count: 0 },
    cavalry: { level: 1, count: 0 },
  }
};

function reducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case 'SET_HEROES':
      return { ...state, heroes: action.payload };
    case "SET_ARMY":
      return {
        ...state,
        army: action.payload,
      };
    case "ADD_RESOURCE":
      return {
        ...state,
        [action.resource]: (state[action.resource] as number) + action.amount,
      };
    case "SET_MISSIONS":
      return {
        ...state,
        missions: action.payload,
      }
    case "SET_ACTIVE_QUEST":
      return {
        ...state,
        activeQuest: action.payload,
        questPanelOpen: true,
      };
    case "TOGGLE_QUEST_PANEL":
      return {
        ...state,
        questPanelOpen: action.payload,
      };
    default:
      return state;
  }
}

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
} | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be inside <UserProvider>");
  return context;
};
