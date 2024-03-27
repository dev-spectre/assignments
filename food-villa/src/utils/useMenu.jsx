import { useState, useEffect, useCallback } from "react";

function useMenu(restaurantId) {
  const [menu, setMenu] = useState([]);

  const getRestaurantMenu = useCallback(async () => {
    const res = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=9.944636599999999&lng=76.31451880000002&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`,
    );
    const json = await res.json();
    setMenu(
      json?.data?.cards?.at(2)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.at(2)
        ?.card?.card?.itemCards,
    );
  }, [restaurantId]);

  useEffect(() => {
    getRestaurantMenu();
  }, [getRestaurantMenu]);

  return menu;
}

export default useMenu;
