import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Search books..."
      value={searchQuery}
      onChangeText={(query) => {
        setSearchQuery(query);
        handleSearch(query);
      }}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

export default SearchBar;
