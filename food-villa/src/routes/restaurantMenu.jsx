import { useParams } from "react-router-dom";
import useMenu from "../utils/useMenu";
import Menu from "../components/menuCard";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slice/cart";

function RestaurantMenu() {
  const { path } = useParams();
  const restaurantId = path.split("-").at(-1);
  const menu = useMenu(restaurantId);

  const dispatch = useDispatch();

  return (
    <main className="container mx-auto max-w-[1280px] p-5">
      <h1 className="mb-7 text-4xl font-bold">Restaurant Menu</h1>
      {menu?.map((card) => (
        <div className="mb-5 border" key={card.card.info.id}>
          <Menu {...card.card.info} />
          <div className="text-center">
            <button
              className="my-5 rounded-md bg-black px-3 py-2"
              onClick={() => {
                dispatch(addItem(card.card.info));
              }}
            >
              Add Item
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}

export default RestaurantMenu;
