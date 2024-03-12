import { useMemo } from "react";

function useSearch(allRestaurants, searchText) {
  return useMemo(() => {
    return allRestaurants.filter((restaurant) =>
      !searchText
        ? true
        : restaurant.info.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [allRestaurants, searchText]);
}

export default useSearch;
