//📦 src/contexts/ResourceContext.tsx
'use client';
import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { ResourceNode } from "@/types/Resource";

interface ResourceContextState {
  resourceNodes: ResourceNode[];
  loading: boolean;
  error: string | null;
}

const initialState: ResourceContextState = {
  resourceNodes: [],
  loading: true,
  error: null,
};

type ResourceAction =
  | { type: "SET_RESOURCE_NODES"; payload: ResourceNode[] }
  | { type: "UPDATE_NODE"; payload: { id: string; data: Partial<ResourceNode> } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

function reducer(state: ResourceContextState, action: ResourceAction): ResourceContextState {
  switch (action.type) {
    case "SET_RESOURCE_NODES":
      return { ...state, resourceNodes: action.payload, loading: false, error: null };
    case "UPDATE_NODE":
      return {
        ...state,
        resourceNodes: state.resourceNodes.map(n =>
          n._id === action.payload.id
            ? { ...n, ...action.payload.data }
            : n
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

const ResourceContext = createContext<{
  state: ResourceContextState;
  dispatch: React.Dispatch<ResourceAction>;
  refetchResourceNodes: () => Promise<void>;
} | undefined>(undefined);

const fetchResourceNodes = async (): Promise<ResourceNode[]> => {
  const res = await fetch('/api/resourceNodes/list');
  if (!res.ok) throw new Error('Ошибка загрузки ресурсных точек');
  const data = await res.json();
  return data.resourceNodes;
};

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const refetchResourceNodes = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const resourceNodes = await fetchResourceNodes();
      dispatch({ type: "SET_RESOURCE_NODES", payload: resourceNodes });
    } catch (e: any) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  };

  useEffect(() => {
    refetchResourceNodes();
  }, []);

  return (
    <ResourceContext.Provider value={{ state, dispatch, refetchResourceNodes }}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResourceNodes = () => {
  const ctx = useContext(ResourceContext);
  if (!ctx) throw new Error("useResourceNodes должен использоваться внутри <ResourceProvider>");
  return ctx;
};
