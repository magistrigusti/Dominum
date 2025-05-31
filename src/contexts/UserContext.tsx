// // 📄 src/context/UserContext.tsx
// 'use client';
// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import type { User } from '@/types/User';

// interface UserContextState {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: UserContextState = {
//   user: null,
//   loading: true,
//   error: null,
// };

// type UserAction =
//   | { type: "SET_USER"; payload: User }
//   | { type: "UPDATE_USER"; payload: Partial<User> }
//   | { type: "SET_LOADING"; payload: boolean }
//   | { type: "SET_ERROR"; payload: string | null }
//   | { type: "LOGOUT" };

// function reducer(state: UserContextState, action: UserAction): UserContextState {
//   switch (action.type) {
//     case "SET_USER":
//       return { ...state, user: action.payload, loading: false, error: null };
//     case "UPDATE_USER":
//       return { ...state, user: state.user ? { ...state.user, ...action.payload } : null };
//     case "SET_LOADING":
//       return { ...state, loading: action.payload };
//     case "SET_ERROR":
//       return { ...state, error: action.payload, loading: false };
//     case "LOGOUT":
//       return { ...initialState, loading: false, user: null };
//     default:
//       return state;
//   }
// }

// const UserContext = createContext<{
//   state: UserContextState;
//   dispatch: React.Dispatch<UserAction>;
//   refetchUser: () => Promise<void>;
// } | undefined>(undefined);

// const fetchUser = async (): Promise<User> => {
//   const res = await fetch('/api/user');
//   if (!res.ok) throw new Error('Ошибка загрузки пользователя');
//   const data = await res.json();
//   return data.user;
// };

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const refetchUser = async () => {
//     dispatch({ type: "SET_LOADING", payload: true });

//     try {
//       const user = await fetchUser();
//       dispatch({ type: "SET_USER", payload: user });
//     } catch (e: any) {
//       dispatch({ type: "SET_ERROR", payload: e.message });
//     }
//   };

//   useEffect(() => {
//     refetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ state, dispatch, refetchUser }}>
//       { children }
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const ctx = useContext(UserContext);
//   if (!ctx) throw new Error("useUser должен использоваться внутри <UserProvider>");
//   return ctx;
// }