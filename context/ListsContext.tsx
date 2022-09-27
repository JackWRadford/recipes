import React, { createContext, useState } from "react";

/// Either all recipes, recipes saved by the current user or the current users uploaded recipes
export enum Lists {
  all,
  saved,
  users,
}

interface ListsContextProviderProps {
  children: React.ReactNode;
}

interface IListsContext {
  currentList: Lists;
  onChangeList: (newList: Lists) => void;
}

/// Context
const ListsContext = createContext<IListsContext>({
  currentList: Lists.all,
  onChangeList: () => {},
});

/// Provider
const ListsProvider: React.FC<ListsContextProviderProps> = ({ children }) => {
  const [list, setList] = useState<Lists>(Lists.all);

  const changeListHandler = (newList: Lists) => {
    setList(newList);
  };

  return (
    <ListsContext.Provider
      value={{ currentList: list, onChangeList: changeListHandler }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export { ListsContext, ListsProvider };
