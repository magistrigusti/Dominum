// // 📄 src/contexts/AstralContext.tsx
// 'use client';

// import React, { createContext, useContext, useState, useEffect } from "react";
// import type { AstralMap } from "@/types/AstralMap";

// interface AstralContextType {
//   astralMap: AstralMap | null;
//   refreshAstralMap: () => Promise<void>;
// }

// const AstralContext = createContext<AstralContextType | undefined>(undefined);

// export const AstralProvider = ({ children }: { children: React.ReactNode }) => {
//   const [astralMap, setAstralMap] = useState<AstralMap | null>(null);

//   const refreshAstralMap = async () => {
//     const res = await fetch("/api/astral/init");
//     const data = await res.json();
//     setAstralMap(data);
//   };

//   useEffect(() => {
//     refreshAstralMap();
//   }, []);

//   return (
//     <AstralContext.Provider value={{ astralMap, refreshAstralMap }}>
//       {children}
//     </AstralContext.Provider>
//   );
// };

// export const useAstral = () => {
//   const ctx = useContext(AstralContext);
//   if (!ctx) throw new Error("useAstral must be used within <AstralProvider>");
//   return ctx;
// };
