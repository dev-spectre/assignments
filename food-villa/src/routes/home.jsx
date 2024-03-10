import Search from "../components/search";
import Restaurant from "../components/restaurantCard";
import useRestaurants from "../utils/useRestaurant";
import useOnline from "../utils/useOnline";
import { useState } from "react";

function Home() {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const isOnline = useOnline();
  if (!isOnline)
    alert("It appears you are offline. Please check your internet connection.");

  const city = useRestaurants(setAllRestaurants, setFilteredRestaurants);

  return (
    <div className="mx-5">
      <Search
        restaurantList={allRestaurants}
        setRestaurants={setFilteredRestaurants}
      />
      <main className="container mx-auto grid grid-cols-fluid justify-center gap-4">
        {!allRestaurants.length ? (
          <h2 className="container mx-auto text-center">Loading.....</h2>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Restaurant
              key={restaurant.info.id}
              {...restaurant.info}
              city={city}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default Home;
