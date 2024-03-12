import { useParams } from "react-router-dom";
import useMenu from "../utils/useMenu";
import Menu from "../components/menuCard";

function RestaurantMenu() {
  const { path } = useParams();
  const restaurantId = path.split("-").at(-1);
  const menu = useMenu(restaurantId);

  return (
    <main className="container mx-auto max-w-[1280px] p-5">
      <h1 className="mb-7 text-4xl font-bold">Restaurant Menu</h1>
      {menu?.map((card) => (
        <Menu key={card.card.info.id} {...card.card.info} />
      ))}
    </main>
  );
}

export default RestaurantMenu;
