// // 📦 src/contexts/ArmyContext.tsx
// 'use client';
// import React, { createContext, useContext, useReducer, useEffect } from "react";
// import type { ArmyUnit } from "@/types/Army";

// interface ArmyContextState {
//   army: ArmyUnit[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ArmyContextState = {
//   army: [],
//   loading: true,
//   error: null,
// };

// type ArmyAction =
//   | { type: "SET_ARMY"; payload: ArmyUnit[] }
//   | { type: "UPDATE_UNIT"; payload: { unitType: string; data: Partial<ArmyUnit>} }
//   | { type: "SET_LOADING", payload: boolean }
//   | { type: "SET_ERROR"; payload: string | null };

// function reducer(state: ArmyContextState, action: ArmyAction): ArmyContextState {
//   switch (action.type) {
//     case "SET_ARMY":
//       return { ...state, army: action.payload, loading: false, error: null };
//     case "UPDATE_UNIT":
//       return {...state,
//         army: state.army.map(u => 
//           u.unitType === action.payload.unitType
//           ? { ...u, ...action.payload.data } : u 
//         ),
//       }; 
//     case "SET_LOADING": 
//       return { ...state, loading: action.payload };
//     case "SET_ERROR":
//       return { ...state, error: action.payload };
//     default:
//       return state;
//   }
// }

// const ArmyContext = createContext<{
//   state: ArmyContextState;
//   dispatch: React.Dispatch<ArmyAction>;
//   refetchArmy: () => Promise<void>;
// } | undefined>(undefined);

// const fetchArmy = async (): Promise<ArmyUnit[]> => {
//   const res = await fetch('/api/army/list');
//   if (!res.ok) throw new Error('Ошибка загрузки армии');
//   const data = await res.json();
//   return data.army;
// };

// export const ArmyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const refetchArmy = async () => {
//     dispatch({ type: "SET_LOADING", payload: true });

//     try {
//       const army = await fetchArmy();
//       dispatch({ type: "SET_ARMY", payload: army });
//     } catch (e: any) {
//       dispatch({ type: "SET_ERROR", payload: e.message });
//     }
//   };

//   useEffect(() => {
//     refetchArmy();
//   }, []);

//   return (
//     <ArmyContext.Provider value={{ state, dispatch, refetchArmy }}>
//       { children }
//     </ArmyContext.Provider>
//   );
// };

// export const useArmy = () => {
//   const ctx = useContext(ArmyContext);
//   if (!ctx) throw new Error("useArmy должен использоваться внутри <ArmyProvider>")
// }