import { useState } from "react";
import { PropTypes } from "prop-types";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <input
      className="mr-3 rounded-sm bg-neutral-300 px-2 py-1 text-black active:outline-4"
      onChange={(e) => setSearchValue(e.target.value)}
      type="text"
      placeholder="type something"
      value={searchValue}
    />
  );
}

function Search({ restaurantList, setRestaurants }) {
  return (
    <div className="mx-auto mb-5 w-max">
      <SearchBar />
      <button
        className="rounded-sm bg-black px-4 py-1 active:opacity-70"
        onClick={(e) => {
          const searchText = e.target.previousElementSibling.value;
          setRestaurants(
            restaurantList.filter((restaurant) =>
              !searchText
                ? true
                : restaurant.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()),
            ),
          );
        }}
      >
        Search
      </button>
    </div>
  );
}

Search.propTypes = {
  restaurantList: PropTypes.array.isRequired,
  setRestaurants: PropTypes.func.isRequired,
};

export default Search;
