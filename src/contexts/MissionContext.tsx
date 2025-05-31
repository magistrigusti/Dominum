// // 📦 src/contexts/MissionContext.tsx
// 'use client';
// import React, { createContext, useContext, useReducer, useEffect } from "react";
// import type { Mission } from "@/types/Mission";

// interface MissionContextState {
//   missions: Mission[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: MissionContextState = {
//   missions: [],
//   loading: true,
//   error: null,
// };

// type MissionAction =
//   | { type: "SET_MISSIONS"; payload: Mission[] }
//   | { type: "UPDATE_MISSION"; payload: { id: string; data: Partial<Mission> } }
//   | { type: "SET_LOADING"; payload: boolean }
//   | { type: "SET_ERROR"; payload: string | null };

// function reducer(state: MissionContextState, action: MissionAction): MissionContextState {
//   switch (action.type) {
//     case "SET_MISSIONS":
//       return { ...state, missions: action.payload, loading: false, error: null };
//     case "UPDATE_MISSION":
//       return {
//         ...state,
//         missions: state.missions.map(m =>
//           m._id === action.payload.id
//             ? { ...m, ...action.payload.data }
//             : m
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

// const MissionContext = createContext<{
//   state: MissionContextState;
//   dispatch: React.Dispatch<MissionAction>;
//   refetchMissions: () => Promise<void>;
// } | undefined>(undefined);

// const fetchMissions = async (): Promise<Mission[]> => {
//   const res = await fetch('/api/missions/list');
//   if (!res.ok) throw new Error('Ошибка загрузки миссий');
//   const data = await res.json();
//   return data.missions;
// };

// export const MissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const refetchMissions = async () => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       const missions = await fetchMissions();
//       dispatch({ type: "SET_MISSIONS", payload: missions });
//     } catch (e: any) {
//       dispatch({ type: "SET_ERROR", payload: e.message });
//     }
//   };

//   useEffect(() => {
//     refetchMissions();
//   }, []);

//   return (
//     <MissionContext.Provider value={{ state, dispatch, refetchMissions }}>
//       {children}
//     </MissionContext.Provider>
//   );
// };

// export const useMissions = () => {
//   const ctx = useContext(MissionContext);
//   if (!ctx) throw new Error("useMissions должен использоваться внутри <MissionProvider>");
//   return ctx;
// };
