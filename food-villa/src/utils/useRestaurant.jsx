import { useEffect } from "react";

let city;
function useRestaurants(setAllRestaurants) {
  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const res = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=9.944636599999999&lng=76.31451880000002&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
    );
    const json = await res.json();
    city = json?.data?.cards?.at(-1)?.card?.card?.citySlug;
    const restaurantList =
      json?.data?.cards?.at(4)?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];
    setAllRestaurants(restaurantList);
  }

  return city;
}

export default useRestaurants;
