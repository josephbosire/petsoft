"use client";
import React, { createContext, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};
type SearchContext = {
  searchQuery: string;
  handleChangeSearchQuery: (newValue: string) => void;
};
export const SearchContext = createContext<SearchContext | null>(null);

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeSearchQuery = (newValue: string) => {
    setSearchQuery(newValue);
  };
  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleChangeSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
