// 📄 src/contexts/InventoryContext.tsx
'use client';
import React, { createContext, useContext, useReducer } from "react";
import type { InventoryItem } from '@/types/Inventory';

interface InventoryState {
  items: InventoryItem[];
}

const initialState: InventoryState = { items: [] };

type InventoryAction =
  | { type: "SET_ITEMS", payload: InventoryItem[] }
  | { type: "ADD_ITEM", payload: InventoryItem }
  | { type: "REMOVE_ITEM", payload: string }; // itemId

function reducer(state: InventoryState, action: InventoryAction): InventoryState {
  switch (action.type) {
    case "SET_ITEMS": return { ...state, items: action.payload };
    case "ADD_ITEM": return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM": return { ...state, items: state.items.filter(i => i.itemId !== action.payload) };
    default: return state;
  }
}

const InventoryContext = createContext<{ state: InventoryState, dispatch: React.Dispatch<InventoryAction> } | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error("useInventory must be inside <InventoryProvider>");
  return context;
};
