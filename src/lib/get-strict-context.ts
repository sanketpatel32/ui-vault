import * as React from "react";

export function getStrictContext<T>(name?: string): [React.Provider<T | null>, () => T] {
  const Context = React.createContext<T | null>(null);
  Context.displayName = name;

  function useContext(): T {
    const context = React.useContext(Context);
    if (context === null) {
      throw new Error(`useContext must be used within a ${name || "Provider"}`);
    }
    return context;
  }

  return [Context.Provider, useContext];
}

export function createStrictContext<T>(name?: string): [React.Provider<T | null>, () => T] {
  return getStrictContext<T>(name);
}
